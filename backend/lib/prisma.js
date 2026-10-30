require("dotenv").config();

const { PrismaClient } = require("../generated/prisma/client.ts");
const { PrismaLibSql } = require("@prisma/adapter-libsql");

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not configured in .env");
}

const adapter = new PrismaLibSql({ url: databaseUrl });
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
