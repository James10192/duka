"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { getNextInvoiceNumber } from "@/lib/invoice-numbering";
import { revalidatePath } from "next/cache";
import type { PaymentMethod, PaymentStatus } from "@/generated/prisma/client";

export async function createSale(data: {
  orgId: string;
  storeId: string;
  clientId?: string;
  items: { productId: string; quantity: number; unitPrice: number }[];
  paymentMethod: PaymentMethod;
  discount?: number;
  depositAmount?: number;
  notes?: string;
}) {
  const userId = await getUserId();

  if (!data.items.length) throw new Error("Sale must have at least one item");

  const discount = data.discount ?? 0;
  const depositAmount = data.depositAmount ?? 0;

  // Calculate totals
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );
  const total = subtotal - discount;

  // Determine payment status
  let paymentStatus: PaymentStatus = "PAID";
  if (depositAmount > 0 && depositAmount < total) {
    paymentStatus = "PARTIAL";
  } else if (depositAmount === 0 && data.paymentMethod !== "CASH") {
    paymentStatus = "PENDING";
  }

  // Get org tax rate for tax calculation
  const org = await prisma.organization.findUnique({
    where: { id: data.orgId },
    select: { taxRate: true },
  });
  const taxRate = org?.taxRate ?? 18;
  const taxAmount = Math.round((total * taxRate) / (100 + taxRate));

  // Generate invoice number before transaction
  const invoiceNumber = await getNextInvoiceNumber(data.orgId);

  const sale = await prisma.$transaction(async (tx) => {
    // Create the sale
    const createdSale = await tx.sale.create({
      data: {
        orgId: data.orgId,
        storeId: data.storeId,
        clientId: data.clientId,
        userId,
        total,
        taxAmount,
        discount,
        paymentMethod: data.paymentMethod,
        paymentStatus,
        depositAmount,
        invoiceNumber,
        notes: data.notes,
      },
    });

    // Create sale items and decrement stock
    for (const item of data.items) {
      await tx.saleItem.create({
        data: {
          saleId: createdSale.id,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        },
      });

      // Decrement product stock
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });

      // Create stock movement (OUT)
      await tx.stockMovement.create({
        data: {
          orgId: data.orgId,
          storeId: data.storeId,
          productId: item.productId,
          type: "OUT",
          quantity: item.quantity,
          reason: `Vente ${invoiceNumber}`,
          userId,
        },
      });
    }

    // Create cash entry (IN)
    const cashAmount = depositAmount > 0 ? depositAmount : total;
    await tx.cashEntry.create({
      data: {
        orgId: data.orgId,
        storeId: data.storeId,
        type: "IN",
        amount: cashAmount,
        label: `Vente ${invoiceNumber}`,
        method: data.paymentMethod,
        relatedSaleId: createdSale.id,
        userId,
      },
    });

    // Create invoice record
    await tx.invoice.create({
      data: {
        orgId: data.orgId,
        saleId: createdSale.id,
        number: invoiceNumber,
        status: "DRAFT",
      },
    });

    // Update client metrics if clientId provided
    if (data.clientId) {
      await tx.client.update({
        where: { id: data.clientId },
        data: {
          totalPurchases: { increment: 1 },
          totalSpent: { increment: total },
          lastPurchaseAt: new Date(),
        },
      });
    }

    return createdSale;
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/sales");
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/cash");
  return sale;
}

export async function getSales(
  orgId: string,
  filters?: {
    storeId?: string;
    dateFrom?: Date;
    dateTo?: Date;
    clientId?: string;
    paymentMethod?: PaymentMethod;
    status?: PaymentStatus;
  }
) {
  await getUserId();

  const where: Record<string, unknown> = { orgId };

  if (filters?.storeId) where.storeId = filters.storeId;
  if (filters?.clientId) where.clientId = filters.clientId;
  if (filters?.paymentMethod) where.paymentMethod = filters.paymentMethod;
  if (filters?.status) where.paymentStatus = filters.status;

  if (filters?.dateFrom || filters?.dateTo) {
    where.date = {};
    if (filters.dateFrom)
      (where.date as Record<string, unknown>).gte = filters.dateFrom;
    if (filters.dateTo)
      (where.date as Record<string, unknown>).lte = filters.dateTo;
  }

  const sales = await prisma.sale.findMany({
    where,
    include: {
      client: { select: { id: true, name: true, phone: true } },
      items: {
        include: {
          product: { select: { id: true, name: true, ref: true } },
        },
      },
      store: { select: { id: true, name: true } },
    },
    orderBy: { date: "desc" },
  });

  return sales;
}

export async function getSale(id: string) {
  await getUserId();

  const sale = await prisma.sale.findUnique({
    where: { id },
    include: {
      client: true,
      items: {
        include: {
          product: true,
        },
      },
      store: { select: { id: true, name: true } },
      invoice: true,
    },
  });

  if (!sale) throw new Error("Sale not found");
  return sale;
}

export async function getDashboardStats(orgId: string, storeId?: string) {
  await getUserId();

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  // Also use last 30 days for stats (handles month transitions)
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const storeFilter = storeId ? { storeId } : {};

  // Run all queries in parallel
  const [
    todaySalesData,
    monthSalesData,
    topProducts,
    recentSales,
    lowStockProducts,
    clientCount,
  ] = await Promise.all([
    // Today's sales
    prisma.sale.aggregate({
      where: {
        orgId,
        ...storeFilter,
        date: { gte: todayStart },
      },
      _sum: { total: true },
      _count: { id: true },
    }),

    // Month's sales (last 30 days to handle month transitions)
    prisma.sale.aggregate({
      where: {
        orgId,
        ...storeFilter,
        date: { gte: last30Days },
      },
      _sum: { total: true },
      _count: { id: true },
    }),

    // Top 5 products by revenue (last 30 days)
    prisma.saleItem.groupBy({
      by: ["productId"],
      where: {
        sale: {
          orgId,
          ...storeFilter,
          date: { gte: last30Days },
        },
      },
      _sum: { total: true, quantity: true },
      orderBy: { _sum: { total: "desc" } },
      take: 5,
    }),

    // Recent 10 sales
    prisma.sale.findMany({
      where: { orgId, ...storeFilter },
      include: {
        client: { select: { id: true, name: true } },
        items: {
          include: {
            product: { select: { id: true, name: true, ref: true } },
          },
        },
      },
      orderBy: { date: "desc" },
      take: 10,
    }),

    // Low stock products (fetch candidates, filter in JS for column comparison)
    prisma.product.findMany({
      where: {
        orgId,
        isActive: true,
        ...storeFilter,
      },
      select: {
        id: true,
        name: true,
        ref: true,
        stock: true,
        minStock: true,
        store: { select: { id: true, name: true } },
      },
      orderBy: { stock: "asc" },
    }),

    // Client count
    prisma.client.count({ where: { orgId } }),
  ]);

  // Filter low stock products (stock <= minStock) in JS
  const filteredLowStock = lowStockProducts
    .filter((p) => p.stock <= p.minStock)
    .slice(0, 20);

  // Fetch product names for top products
  const topProductIds = topProducts.map((p) => p.productId);
  const productDetails = await prisma.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true, ref: true, buyPrice: true, sellPrice: true },
  });

  const productMap = new Map(productDetails.map((p) => [p.id, p]));

  const topProductsWithNames = topProducts.map((p) => {
    const product = productMap.get(p.productId);
    return {
      productId: p.productId,
      name: product?.name ?? "Unknown",
      ref: product?.ref ?? "",
      revenue: p._sum.total ?? 0,
      quantitySold: p._sum.quantity ?? 0,
    };
  });

  // Calculate gross margin (last 30 days)
  const monthSaleItems = await prisma.saleItem.findMany({
    where: {
      sale: {
        orgId,
        ...storeFilter,
        date: { gte: last30Days },
      },
    },
    include: {
      product: { select: { buyPrice: true } },
    },
  });

  const totalCost = monthSaleItems.reduce(
    (sum, item) => sum + item.product.buyPrice * item.quantity,
    0
  );
  const monthRevenue = monthSalesData._sum.total ?? 0;
  const grossMargin =
    monthRevenue > 0
      ? ((monthRevenue - totalCost) / monthRevenue) * 100
      : 0;

  const todayRevenue = todaySalesData._sum.total ?? 0;
  const todaySales = todaySalesData._count.id;
  const monthSales = monthSalesData._count.id;
  const avgBasket = monthSales > 0 ? monthRevenue / monthSales : 0;

  return {
    todayRevenue,
    todaySales,
    monthRevenue,
    monthSales,
    avgBasket: Math.round(avgBasket),
    grossMargin: Math.round(grossMargin * 10) / 10,
    topProducts: topProductsWithNames,
    recentSales,
    lowStockProducts: filteredLowStock,
    clientCount,
  };
}
