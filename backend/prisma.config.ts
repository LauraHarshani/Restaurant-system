import "dotenv/config";
import { defineConfig } from "@prisma/config";

const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_SQLITE;

if (!databaseUrl) {
  throw new Error("DATABASE_URL or DATABASE_URL_SQLITE is not configured in .env");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
