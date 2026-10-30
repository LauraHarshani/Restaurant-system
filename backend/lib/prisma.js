require("dotenv").config();

const databaseEnvironment = process.env.DATABASE_ENV || (process.env.NODE_ENV === "production" ? "" : "sqlite");

if (process.env.NODE_ENV === "production" && databaseEnvironment !== "mysql") {
  throw new Error('Production requires DATABASE_ENV="mysql"; refusing to start with a different database.');
}

if (databaseEnvironment !== "sqlite" && databaseEnvironment !== "mysql") {
  throw new Error('DATABASE_ENV must be explicitly set to "sqlite" or "mysql".');
}

const clientModule = databaseEnvironment === "mysql"
  ? require("./prisma.mysql.ts")
  : require("./prisma.sqlite.ts");
const prisma = clientModule.prisma || clientModule.default;

module.exports = prisma;
module.exports.prisma = prisma;
module.exports.default = prisma;
