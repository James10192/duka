"use server";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth-session";
import { slugify, generateRef } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function completeOnboarding(data: {
  orgName: string;
  sector?: string;
  city?: string;
  products: { name: string; sellPrice: number; stock: number }[];
  phone?: string;
}) {
  const userId = await getUserId();
  const slug = slugify(data.orgName);

  // Ensure unique slug
  const existingOrg = await prisma.organization.findUnique({
    where: { slug },
  });
  const finalSlug = existingOrg ? `${slug}-${Date.now()}` : slug;

  const org = await prisma.$transaction(async (tx) => {
    // Create organization
    const organization = await tx.organization.create({
      data: {
        name: data.orgName,
        slug: finalSlug,
        sector: data.sector,
        city: data.city,
        phone: data.phone,
        onboardingDone: true,
      },
    });

    // Create default store
    const store = await tx.store.create({
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

    // Create products with refs and initial stock movements
    for (let i = 0; i < data.products.length; i++) {
      const prod = data.products[i];
      const ref = generateRef("PRD", i + 1);

      const product = await tx.product.create({
        data: {
          orgId: organization.id,
          storeId: store.id,
          ref,
          name: prod.name,
          buyPrice: 0,
          sellPrice: prod.sellPrice,
          stock: prod.stock,
        },
      });

      // Create initial stock movement if stock > 0
      if (prod.stock > 0) {
        await tx.stockMovement.create({
          data: {
            orgId: organization.id,
            storeId: store.id,
            productId: product.id,
            type: "IN",
            quantity: prod.stock,
            reason: "Stock initial (onboarding)",
            userId,
          },
        });
      }
    }

    return organization;
  });

  revalidatePath("/dashboard");
  return org;
}
