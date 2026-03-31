import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

// Load env vars same as prisma.config.ts
config({ path: ".env.local" });
config({ path: ".env" });

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function daysAgo(n: number): Date {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000);
}

function invoiceNumber(seq: number): string {
  return `DUKA-2026-${String(seq).padStart(5, "0")}`;
}

// ---------------------------------------------------------------------------
// Data definitions
// ---------------------------------------------------------------------------

const PRODUCTS_DATA = [
  { ref: "PRD-0001", name: "Champagne Moet & Chandon 75cl", buyPrice: 25000, sellPrice: 45000, stock: 24, minStock: 5 },
  { ref: "PRD-0002", name: "Champagne Veuve Clicquot 75cl", buyPrice: 30000, sellPrice: 55000, stock: 18, minStock: 5 },
  { ref: "PRD-0003", name: "Hennessy VS 70cl", buyPrice: 15000, sellPrice: 28000, stock: 35, minStock: 10 },
  { ref: "PRD-0004", name: "Hennessy VSOP 70cl", buyPrice: 25000, sellPrice: 48000, stock: 12, minStock: 5 },
  { ref: "PRD-0005", name: "Whisky Jack Daniel's 1L", buyPrice: 12000, sellPrice: 22000, stock: 40, minStock: 10 },
  { ref: "PRD-0006", name: "Whisky Johnnie Walker Red 1L", buyPrice: 10000, sellPrice: 18000, stock: 45, minStock: 10 },
  { ref: "PRD-0007", name: "Vin Rouge Bordeaux 75cl", buyPrice: 8000, sellPrice: 15000, stock: 30, minStock: 8 },
  { ref: "PRD-0008", name: "Vin Rose Provence 75cl", buyPrice: 7000, sellPrice: 13000, stock: 25, minStock: 8 },
  { ref: "PRD-0009", name: "Champagne Dom Perignon 75cl", buyPrice: 80000, sellPrice: 150000, stock: 6, minStock: 2 },
  { ref: "PRD-0010", name: "Baileys Irish Cream 70cl", buyPrice: 8000, sellPrice: 16000, stock: 20, minStock: 5 },
  { ref: "PRD-0011", name: "Amarula 70cl", buyPrice: 6000, sellPrice: 12000, stock: 22, minStock: 5 },
  { ref: "PRD-0012", name: "Martini Rosso 100cl", buyPrice: 5000, sellPrice: 10000, stock: 3, minStock: 5 },
  { ref: "PRD-0013", name: "Champagne Ruinart Blanc 75cl", buyPrice: 45000, sellPrice: 85000, stock: 8, minStock: 3 },
  { ref: "PRD-0014", name: "Ciroc Vodka 70cl", buyPrice: 18000, sellPrice: 35000, stock: 1, minStock: 5 },
  { ref: "PRD-0015", name: "Grey Goose Vodka 1L", buyPrice: 22000, sellPrice: 42000, stock: 15, minStock: 5 },
] as const;

const CLIENTS_DATA = [
  { name: "Kouame Affoue", phone: "+22507111111", type: "VIP" as const, area: "Cocody", totalPurchases: 12, totalSpent: 450000 },
  { name: "Ibrahim Traore", phone: "+22505222222", type: "ENTREPRISE" as const, area: "Plateau", totalPurchases: 8, totalSpent: 680000 },
  { name: "Marie Kouassi", phone: "+22501333333", type: "PARTICULIER" as const, area: "Marcory", totalPurchases: 3, totalSpent: 85000 },
  { name: "Seydou Diallo", phone: "+22507444444", type: "REVENDEUR" as const, area: "Adjame", totalPurchases: 15, totalSpent: 1200000 },
  { name: "Awa Sangare", phone: "+22505555555", type: "EVENEMENTIEL" as const, area: "Cocody", totalPurchases: 5, totalSpent: 750000 },
  { name: "Jean-Pierre Aka", phone: "+22501666666", type: "PARTICULIER" as const, area: "Yopougon", totalPurchases: 2, totalSpent: 36000 },
  { name: "Fatou Bamba", phone: "+22507777777", type: "VIP" as const, area: "Riviera", totalPurchases: 20, totalSpent: 980000 },
  { name: "Restaurant Le Diplomat", phone: "+22505888888", type: "ENTREPRISE" as const, area: "Plateau", totalPurchases: 25, totalSpent: 2500000 },
] as const;

// Sale definitions: [daysAgo, paymentMethod, clientIndex, items: [productIndex, qty][]]
const SALES_DEF: Array<{
  ago: number;
  method: "CASH" | "MOBILE_MONEY" | "CARD";
  clientIdx: number;
  items: [number, number][];
}> = [
  { ago: 13, method: "CASH",         clientIdx: 0, items: [[0, 2], [2, 1]] },
  { ago: 12, method: "MOBILE_MONEY", clientIdx: 1, items: [[3, 1], [6, 2]] },
  { ago: 10, method: "CASH",         clientIdx: 7, items: [[0, 3], [1, 2], [8, 1]] },
  { ago: 8,  method: "CARD",         clientIdx: 3, items: [[4, 5], [5, 5]] },
  { ago: 7,  method: "MOBILE_MONEY", clientIdx: 4, items: [[1, 2], [12, 1]] },
  { ago: 5,  method: "CASH",         clientIdx: 2, items: [[9, 1], [10, 2]] },
  { ago: 4,  method: "CARD",         clientIdx: 6, items: [[8, 1]] },
  { ago: 3,  method: "MOBILE_MONEY", clientIdx: 5, items: [[6, 1], [7, 1]] },
  { ago: 1,  method: "CASH",         clientIdx: 0, items: [[13, 1], [14, 1]] },
  { ago: 0,  method: "MOBILE_MONEY", clientIdx: 7, items: [[0, 2], [3, 1], [11, 3]] },
];

// ---------------------------------------------------------------------------
// Main seed
// ---------------------------------------------------------------------------

async function main() {
  // 1. Find first existing user
  const user = await prisma.user.findFirst({ orderBy: { createdAt: "asc" } });
  if (!user) {
    console.error("ERROR: No user found in the database. Sign in via Better Auth first, then re-run the seed.");
    process.exit(1);
  }
  console.log(`Found user: ${user.name} (${user.email})`);

  // 2. Clean up existing seed data for this user (idempotent)
  const existingMembers = await prisma.member.findMany({ where: { userId: user.id } });
  const orgIds = existingMembers.map((m) => m.orgId);

  if (orgIds.length > 0) {
    console.log("Cleaning up existing data...");
    // Cascade deletes will handle children
    await prisma.organization.deleteMany({ where: { id: { in: orgIds } } });
  }

  // 3. Create organization
  console.log("Creating organization...");
  const org = await prisma.organization.create({
    data: {
      name: "Cave Premium Cocody",
      slug: "cave-premium-cocody",
      sector: "Boissons premium",
      city: "Abidjan - Cocody",
      currency: "XOF",
      taxRate: 18,
      plan: "PRO",
      onboardingDone: true,
    },
  });

  // 4. Create store
  console.log("Creating store...");
  const store = await prisma.store.create({
    data: {
      orgId: org.id,
      name: "Boutique Cocody",
      address: "Rue des Jardins, Cocody, Abidjan",
      phone: "+22507000001",
    },
  });

  // 5. Create member (OWNER)
  console.log("Linking user as OWNER...");
  await prisma.member.create({
    data: {
      orgId: org.id,
      userId: user.id,
      role: "OWNER",
      storeAccess: [store.id],
    },
  });

  // 6. Create products
  console.log("Creating 15 products...");
  const products = await Promise.all(
    PRODUCTS_DATA.map((p) =>
      prisma.product.create({
        data: {
          orgId: org.id,
          storeId: store.id,
          ref: p.ref,
          name: p.name,
          category: "Boissons premium",
          buyPrice: p.buyPrice,
          sellPrice: p.sellPrice,
          stock: p.stock,
          minStock: p.minStock,
        },
      })
    )
  );

  // 7. Create clients
  console.log("Creating 8 clients...");
  const clients = await Promise.all(
    CLIENTS_DATA.map((c) =>
      prisma.client.create({
        data: {
          orgId: org.id,
          name: c.name,
          phone: c.phone,
          type: c.type,
          area: c.area,
          totalPurchases: c.totalPurchases,
          totalSpent: c.totalSpent,
        },
      })
    )
  );

  // 8. Create invoice counter
  console.log("Creating invoice counter...");
  await prisma.invoiceCounter.create({
    data: {
      orgId: org.id,
      fiscalYear: 2026,
      lastNumber: 10,
    },
  });

  // 9. Create 10 sales with items, stock movements, cash entries, and invoices
  console.log("Creating 10 sales...");
  for (let i = 0; i < SALES_DEF.length; i++) {
    const def = SALES_DEF[i];
    const saleDate = daysAgo(def.ago);
    const invNum = invoiceNumber(i + 1);

    // Compute sale items and total
    const saleItems = def.items.map(([pIdx, qty]) => ({
      productId: products[pIdx].id,
      quantity: qty,
      unitPrice: products[pIdx].sellPrice,
      total: products[pIdx].sellPrice * qty,
    }));
    const saleTotal = saleItems.reduce((sum, si) => sum + si.total, 0);

    // Determine invoice status: older sales (> 3 days ago) are PAID, recent are DRAFT
    const invoiceStatus = def.ago > 3 ? "PAID" : "DRAFT";

    await prisma.$transaction(async (tx) => {
      // Create sale
      const sale = await tx.sale.create({
        data: {
          orgId: org.id,
          storeId: store.id,
          clientId: clients[def.clientIdx].id,
          userId: user.id,
          total: saleTotal,
          taxAmount: Math.round(saleTotal * 0.18),
          paymentMethod: def.method,
          paymentStatus: "PAID",
          invoiceNumber: invNum,
          date: saleDate,
        },
      });

      // Create sale items
      await Promise.all(
        saleItems.map((si) =>
          tx.saleItem.create({
            data: {
              saleId: sale.id,
              productId: si.productId,
              quantity: si.quantity,
              unitPrice: si.unitPrice,
              total: si.total,
            },
          })
        )
      );

      // Decrement stock and create stock movements
      await Promise.all(
        def.items.map(([pIdx, qty]) =>
          Promise.all([
            tx.product.update({
              where: { id: products[pIdx].id },
              data: { stock: { decrement: qty } },
            }),
            tx.stockMovement.create({
              data: {
                orgId: org.id,
                storeId: store.id,
                productId: products[pIdx].id,
                type: "OUT",
                quantity: qty,
                reason: `Vente ${invNum}`,
                userId: user.id,
                date: saleDate,
              },
            }),
          ])
        )
      );

      // Create cash entry (IN)
      await tx.cashEntry.create({
        data: {
          orgId: org.id,
          storeId: store.id,
          type: "IN",
          amount: saleTotal,
          label: `Vente ${invNum}`,
          method: def.method,
          relatedSaleId: sale.id,
          userId: user.id,
          date: saleDate,
        },
      });

      // Create invoice
      await tx.invoice.create({
        data: {
          orgId: org.id,
          saleId: sale.id,
          number: invNum,
          status: invoiceStatus,
        },
      });
    });
  }

  // 10. Create manual cash OUT entries
  console.log("Creating manual cash entries...");
  const manualExpenses = [
    { label: "Loyer boutique Cocody", amount: 150000, ago: 10 },
    { label: "Transport livraison", amount: 15000, ago: 6 },
    { label: "Achat emballages", amount: 8000, ago: 2 },
  ];
  await Promise.all(
    manualExpenses.map((e) =>
      prisma.cashEntry.create({
        data: {
          orgId: org.id,
          storeId: store.id,
          type: "OUT",
          amount: e.amount,
          label: e.label,
          method: "CASH",
          userId: user.id,
          date: daysAgo(e.ago),
        },
      })
    )
  );

  console.log("");
  console.log("=== Seed complete ===");
  console.log("1 org, 1 store, 15 products, 8 clients, 10 sales, 3 expenses");
  console.log(`Organization: ${org.name} (${org.slug})`);
  console.log(`Store: ${store.name}`);
  console.log(`Owner: ${user.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
