require("dotenv").config();

const sqliteModule = require("../lib/prisma.sqlite.ts");
const mysqlModule = require("../lib/prisma.mysql.ts");
const sqlite = sqliteModule.prisma || sqliteModule.default;
const mysql = mysqlModule.prisma || mysqlModule.default;
const tables = [
  "user",
  "chef",
  "menuItem",
  "category",
  "order",
  "orderItem",
  "contactMessage",
  "contactReply",
  "contactDetails",
  "pageContent",
];

async function main() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Run this transfer from a controlled maintenance environment, not the production application process.");
  }

  const sourceCounts = {};
  const targetCounts = {};
  for (const table of tables) {
    sourceCounts[table] = await sqlite[table].count();
    targetCounts[table] = await mysql[table].count();
  }

  console.log("SQLite source row counts:", sourceCounts);
  console.log("MySQL target row counts:", targetCounts);

  if (Object.values(targetCounts).some((count) => count > 0)) {
    throw new Error("MySQL target is not empty. Transfer stopped without writing any rows.");
  }

  if (!process.argv.includes("--execute") || !process.argv.includes("--confirm-empty-target")) {
    console.log("Dry run only. Stop application writes, back up both databases, then rerun with --execute --confirm-empty-target to transfer rows.");
    return;
  }

  const sourceData = {};
  for (const table of tables) {
    sourceData[table] = await sqlite[table].findMany();
  }

  await mysql.$transaction(async (tx) => {
    // Insert parents before their dependent rows; explicit IDs preserve references.
    for (const table of ["user", "chef", "menuItem", "category", "order", "contactMessage", "contactDetails", "pageContent", "orderItem", "contactReply"]) {
      const rows = sourceData[table];
      if (rows.length) await tx[table].createMany({ data: rows });
    }
  });

  console.log("Transfer completed. Verify row counts and application behavior before reopening writes.");
}

main()
  .catch((error) => {
    console.error("Transfer stopped:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await Promise.allSettled([sqlite.$disconnect(), mysql.$disconnect()]);
  });
