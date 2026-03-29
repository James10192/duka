import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { config } from "dotenv";

config({ path: ".env.local" });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  const users = await prisma.user.findMany({
    include: { accounts: true }
  });

  console.log(`Found ${users.length} users:`);
  for (const u of users) {
    console.log(`  ${u.id} | ${u.email} | ${u.name} | verified: ${u.emailVerified}`);
    for (const a of u.accounts) {
      console.log(`    -> provider: ${a.providerId} | accountId: ${a.accountId}`);
    }
  }

  await prisma.$disconnect();
}

main().catch(console.error);
