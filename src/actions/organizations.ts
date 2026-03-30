"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createOrganization(data: {
  name: string;
  slug?: string;
  sector?: string;
  city?: string;
  currency?: string;
  taxRate?: number;
}) {
  const userId = await getUserId();
  const slug = data.slug || slugify(data.name);

  const org = await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        name: data.name,
        slug,
        sector: data.sector,
        city: data.city,
        currency: data.currency ?? "XOF",
        taxRate: data.taxRate ?? 18,
      },
    });

    // Create default store
    await tx.store.create({
      data: {
        orgId: organization.id,
        name: "Boutique principale",
      },
    });

    // Create owner membership
    await tx.member.create({
      data: {
        orgId: organization.id,
        userId,
        role: "OWNER",
      },
    });

    return organization;
  });

  revalidatePath("/dashboard");
  return org;
}

export async function getOrganization(orgId: string) {
  await getUserId();

  const org = await prisma.organization.findUnique({
    where: { id: orgId },
    include: {
      stores: { where: { isActive: true } },
      _count: { select: { members: true } },
    },
  });

  if (!org) throw new Error("Organization not found");
  return org;
}

export async function updateOrganization(
  orgId: string,
  data: {
    name?: string;
    logo?: string;
    currency?: string;
    taxRate?: number;
    sector?: string;
    city?: string;
    address?: string;
    phone?: string;
    email?: string;
    settings?: Record<string, string | number | boolean | null>;
  }
) {
  await getUserId();

  const org = await prisma.organization.update({
    where: { id: orgId },
    data,
  });

  revalidatePath("/dashboard");
  return org;
}

export async function getUserOrganizations() {
  const userId = await getUserId();

  const members = await prisma.member.findMany({
    where: { userId },
    include: {
      organization: {
        include: {
          stores: { where: { isActive: true } },
          _count: { select: { members: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return members.map((m) => ({
    ...m.organization,
    role: m.role,
    memberId: m.id,
  }));
}
