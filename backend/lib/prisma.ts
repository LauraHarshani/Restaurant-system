import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.ts';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_SQLITE;

if (!databaseUrl) {
  throw new Error('DATABASE_URL or DATABASE_URL_SQLITE is not configured in .env');
}

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

export const prisma = new PrismaClient({ adapter });
export default prisma;