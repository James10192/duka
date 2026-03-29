import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  const accounts = await prisma.account.findMany();
  console.log(`Found ${accounts.length} accounts:`);
  for (const a of accounts) {
    console.log(`  provider: ${a.providerId} | accountId: ${a.accountId} | userId: ${a.userId}`);
  }

  await prisma.$disconnect();
}
main().catch(console.error);
