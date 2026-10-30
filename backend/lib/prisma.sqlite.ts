import "dotenv/config";
import { PrismaClient } from "../generated/sqlite/client.ts";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const databaseUrl = process.env.DATABASE_URL_SQLITE;
if (!databaseUrl || !/^(file:|libsql:)/i.test(databaseUrl)) {
  throw new Error("DATABASE_URL_SQLITE must be set to the existing SQLite database URL.");
}

const adapter = new PrismaLibSql({ url: databaseUrl });
export const prisma = new PrismaClient({ adapter });
export default prisma;
