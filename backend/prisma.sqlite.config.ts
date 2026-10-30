import "dotenv/config";
import { defineConfig } from "prisma/config";

const sqliteUrl = process.env.DATABASE_URL_SQLITE ?? "";
if (sqliteUrl && !/^(file:|libsql:)/i.test(sqliteUrl)) {
  throw new Error("The SQLite Prisma config only accepts a SQLite or libSQL DATABASE_URL_SQLITE.");
}

export default defineConfig({
  schema: "prisma/schema.sqlite.prisma",
  migrations: { path: "prisma/migrations-sqlite" },
  datasource: { url: sqliteUrl },
});
