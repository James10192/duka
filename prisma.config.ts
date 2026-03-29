import path from "node:path";
import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: path.resolve(__dirname, ".env.local") });

export default defineConfig({
  earlyAccess: true,
  schema: path.resolve(__dirname, "prisma/schema.prisma"),
});
