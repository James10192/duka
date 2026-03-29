import { prisma } from "@/lib/prisma";

/**
 * Generate the next OHADA-compliant invoice number.
 * Format: DUKA-{YEAR}-{SEQUENTIAL_NUMBER}
 * Uses a transaction to ensure no gaps or duplicates.
 */
export async function getNextInvoiceNumber(orgId: string): Promise<string> {
  const year = new Date().getFullYear();

  const counter = await prisma.$transaction(async (tx) => {
    const existing = await tx.invoiceCounter.findUnique({
      where: { orgId_fiscalYear: { orgId, fiscalYear: year } },
    });

    if (existing) {
      return tx.invoiceCounter.update({
        where: { id: existing.id },
        data: { lastNumber: existing.lastNumber + 1 },
      });
    }

    return tx.invoiceCounter.create({
      data: { orgId, fiscalYear: year, lastNumber: 1 },
    });
  });

  return `DUKA-${year}-${String(counter.lastNumber).padStart(5, "0")}`;
}
