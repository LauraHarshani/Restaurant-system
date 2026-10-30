import "dotenv/config";
import { defineConfig } from "prisma/config";

const mysqlUrl = (() => {
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;
  if (!MYSQL_HOST || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD) return "";
  if (MYSQL_DATABASE !== "flame_crust") {
    throw new Error('The MySQL Prisma config only accepts MYSQL_DATABASE="flame_crust".');
  }
  if (MYSQL_USER.toLowerCase() === "root") {
    throw new Error("The MySQL Prisma config refuses to use the root account.");
  }
  const port = MYSQL_PORT || "3306";
  return `mysql://${encodeURIComponent(MYSQL_USER)}:${encodeURIComponent(MYSQL_PASSWORD)}@${MYSQL_HOST}:${port}/${MYSQL_DATABASE}`;
})();

export default defineConfig({
  schema: "prisma/schema.mysql.prisma",
  migrations: { path: "prisma/migrations-mysql" },
  datasource: { url: mysqlUrl },
});
