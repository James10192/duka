import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { config } from "dotenv";

config({ path: ".env.local" });

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  // Delete all sessions, accounts, verifications, then users
  const sessions = await prisma.session.deleteMany();
  console.log(`Deleted ${sessions.count} sessions`);

  const accounts = await prisma.account.deleteMany();
  console.log(`Deleted ${accounts.count} accounts`);

  const verifications = await prisma.verification.deleteMany();
  console.log(`Deleted ${verifications.count} verifications`);

  const users = await prisma.user.deleteMany();
  console.log(`Deleted ${users.count} users`);

  console.log("Database cleaned. You can now sign in fresh.");
  await prisma.$disconnect();
}

main().catch(console.error);
