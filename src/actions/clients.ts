"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { revalidatePath } from "next/cache";
import type { ClientType } from "@/generated/prisma/client";

export async function createClient(data: {
  orgId: string;
  name: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  area?: string;
  type?: ClientType;
  tags?: string[];
  notes?: string;
}) {
  await getUserId();

  const client = await prisma.client.create({
    data: {
      orgId: data.orgId,
      name: data.name,
      phone: data.phone,
      whatsapp: data.whatsapp,
      email: data.email,
      area: data.area,
      type: data.type ?? "PARTICULIER",
      tags: data.tags ?? [],
      notes: data.notes,
    },
  });

  revalidatePath("/dashboard/clients");
  return client;
}

export async function updateClient(
  id: string,
  data: {
    name?: string;
    phone?: string;
    whatsapp?: string;
    email?: string;
    area?: string;
    type?: ClientType;
    tags?: string[];
    notes?: string;
  }
) {
  await getUserId();

  const client = await prisma.client.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/clients");
  return client;
}

export async function getClients(
  orgId: string,
  filters?: {
    search?: string;
    type?: ClientType;
  }
) {
  await getUserId();

  const where: Record<string, unknown> = { orgId };

  if (filters?.type) {
    where.type = filters.type;
  }

  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { phone: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const clients = await prisma.client.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return clients;
}

export async function getClient(id: string) {
  await getUserId();

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      sales: {
        orderBy: { date: "desc" },
        take: 20,
        include: {
          items: {
            include: {
              product: { select: { id: true, name: true, ref: true } },
            },
          },
        },
      },
    },
  });

  if (!client) throw new Error("Client not found");
  return client;
}
