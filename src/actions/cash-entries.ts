"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import type { PaymentMethod } from "@/generated/prisma/client";

export async function createCashEntry(data: {
  orgId: string;
  storeId: string;
  type: "IN" | "OUT";
  amount: number;
  label: string;
  method: PaymentMethod;
}) {
  const userId = await getUserId();

  if (data.amount <= 0) throw new Error("Amount must be positive");

  const entry = await prisma.cashEntry.create({
    data: {
      orgId: data.orgId,
      storeId: data.storeId,
      type: data.type,
      amount: data.amount,
      label: data.label,
      method: data.method,
      userId,
    },
  });

  revalidatePath("/dashboard/cash");
  return entry;
}

export async function getCashEntries(
  orgId: string,
  storeId: string,
  dateFrom?: Date,
  dateTo?: Date
) {
  await getUserId();

  const where: Record<string, unknown> = { orgId, storeId };

  if (dateFrom || dateTo) {
    where.date = {};
    if (dateFrom) (where.date as Record<string, unknown>).gte = dateFrom;
    if (dateTo) (where.date as Record<string, unknown>).lte = dateTo;
  }

  const entries = await prisma.cashEntry.findMany({
    where,
    orderBy: { date: "asc" },
    include: {
      relatedSale: {
        select: { id: true, invoiceNumber: true },
      },
    },
  });

  // Calculate running balance
  let balance = 0;
  const entriesWithBalance = entries.map((entry) => {
    if (entry.type === "IN") {
      balance += entry.amount;
    } else {
      balance -= entry.amount;
    }
    return { ...entry, runningBalance: balance };
  });

  return entriesWithBalance;
}

export async function getDailyBalance(
  orgId: string,
  storeId: string,
  date: Date
) {
  await getUserId();

  const dayStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const dayEnd = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  const entries = await prisma.cashEntry.findMany({
    where: {
      orgId,
      storeId,
      date: { gte: dayStart, lt: dayEnd },
    },
  });

  const totalIn = entries
    .filter((e) => e.type === "IN")
    .reduce((sum, e) => sum + e.amount, 0);

  const totalOut = entries
    .filter((e) => e.type === "OUT")
    .reduce((sum, e) => sum + e.amount, 0);

  return {
    totalIn,
    totalOut,
    balance: totalIn - totalOut,
  };
}
