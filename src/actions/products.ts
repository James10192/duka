"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { generateRef } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createProduct(data: {
  orgId: string;
  storeId: string;
  name: string;
  category?: string;
  format?: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock?: number;
  barcode?: string;
}) {
  const userId = await getUserId();

  const product = await prisma.$transaction(async (tx) => {
    // Count existing products to generate sequential ref
    const count = await tx.product.count({
      where: { orgId: data.orgId },
    });
    const ref = generateRef("PRD", count + 1);

    const created = await tx.product.create({
      data: {
        orgId: data.orgId,
        storeId: data.storeId,
        ref,
        name: data.name,
        category: data.category,
        format: data.format,
        buyPrice: data.buyPrice,
        sellPrice: data.sellPrice,
        stock: data.stock,
        minStock: data.minStock ?? 5,
        barcode: data.barcode,
      },
    });

    // Create initial stock movement if stock > 0
    if (data.stock > 0) {
      await tx.stockMovement.create({
        data: {
          orgId: data.orgId,
          storeId: data.storeId,
          productId: created.id,
          type: "IN",
          quantity: data.stock,
          reason: "Stock initial",
          userId,
        },
      });
    }

    return created;
  });

  revalidatePath("/dashboard/products");
  return product;
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    category?: string;
    format?: string;
    buyPrice?: number;
    sellPrice?: number;
    minStock?: number;
    barcode?: string;
    imageUrl?: string;
  }
) {
  await getUserId();

  const product = await prisma.product.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/products");
  return product;
}

export async function deleteProduct(id: string) {
  await getUserId();

  const product = await prisma.product.update({
    where: { id },
    data: { isActive: false },
  });

  revalidatePath("/dashboard/products");
  return product;
}

export async function getProducts(
  orgId: string,
  filters?: {
    search?: string;
    category?: string;
    storeId?: string;
  }
) {
  await getUserId();

  const where: Record<string, unknown> = {
    orgId,
    isActive: true,
  };

  if (filters?.storeId) {
    where.storeId = filters.storeId;
  }

  if (filters?.category) {
    where.category = filters.category;
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { ref: { contains: filters.search, mode: "insensitive" } },
      { barcode: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      store: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return products;
}

export async function getProduct(id: string) {
  await getUserId();

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      store: { select: { id: true, name: true } },
      stockMovements: {
        orderBy: { date: "desc" },
        take: 50,
      },
    },
  });

  if (!product) throw new Error("Product not found");
  return product;
}

export async function adjustStock(
  productId: string,
  quantity: number,
  type: "IN" | "OUT" | "ADJUSTMENT" | "LOSS",
  reason?: string
) {
  const userId = await getUserId();

  const result = await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error("Product not found");

    // Calculate new stock
    let newStock = product.stock;
    if (type === "IN") {
      newStock += quantity;
    } else if (type === "OUT" || type === "LOSS") {
      newStock -= quantity;
      if (newStock < 0) throw new Error("Insufficient stock");
    } else if (type === "ADJUSTMENT") {
      newStock = quantity; // Adjustment sets absolute value
    }

    // Create stock movement
    await tx.stockMovement.create({
      data: {
        orgId: product.orgId,
        storeId: product.storeId,
        productId,
        type,
        quantity,
        reason,
        userId,
      },
    });

    // Update product stock
    const updated = await tx.product.update({
      where: { id: productId },
      data: { stock: newStock },
    });

    return updated;
  });

  revalidatePath("/dashboard/products");
  return result;
}
