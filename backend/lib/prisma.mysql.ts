import "dotenv/config";
import { PrismaClient } from "../generated/mysql/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const { MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;
if (!MYSQL_HOST || !MYSQL_PORT || !MYSQL_DATABASE || !MYSQL_USER || !MYSQL_PASSWORD) {
  throw new Error("MySQL requires MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, and MYSQL_PASSWORD.");
}
if (MYSQL_DATABASE !== "flame_crust") {
  throw new Error('MYSQL_DATABASE must be "flame_crust" for this application.');
}
if (MYSQL_USER.toLowerCase() === "root") {
  throw new Error("The application must not connect to MySQL with the root account.");
}

const adapter = new PrismaMariaDb({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  connectionLimit: 5,
});
export const prisma = new PrismaClient({ adapter });
export default prisma;
