"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import type { InvoiceStatus } from "@/generated/prisma/client";

export async function getInvoices(
  orgId: string,
  filters?: {
    search?: string;
    status?: InvoiceStatus;
  }
) {
  await getUserId();

  const where: Record<string, unknown> = { orgId };

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.search) {
    where.OR = [
      { number: { contains: filters.search, mode: "insensitive" } },
      {
        sale: {
          client: {
            name: { contains: filters.search, mode: "insensitive" },
          },
        },
      },
    ];
  }

  const invoices = await prisma.invoice.findMany({
    where,
    include: {
      sale: {
        include: {
          client: { select: { id: true, name: true, phone: true } },
          store: { select: { id: true, name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return invoices;
}

export async function getInvoice(id: string) {
  await getUserId();

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      sale: {
        include: {
          client: true,
          items: {
            include: {
              product: true,
            },
          },
          store: { select: { id: true, name: true } },
        },
      },
      organization: {
        select: {
          name: true,
          address: true,
          phone: true,
          email: true,
          currency: true,
          taxRate: true,
          logo: true,
        },
      },
    },
  });

  if (!invoice) throw new Error("Invoice not found");
  return invoice;
}

export async function updateInvoiceStatus(
  id: string,
  status: InvoiceStatus
) {
  await getUserId();

  const data: Record<string, unknown> = { status };

  if (status === "SENT") {
    data.sentAt = new Date();
  }

  const invoice = await prisma.invoice.update({
    where: { id },
    data,
  });

  // If invoice is marked as PAID, also update the sale payment status
  if (status === "PAID") {
    await prisma.sale.update({
      where: { id: invoice.saleId },
      data: { paymentStatus: "PAID" },
    });
  }

  revalidatePath("/dashboard/invoices");
  return invoice;
}
