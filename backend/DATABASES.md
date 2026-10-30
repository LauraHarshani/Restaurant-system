# Database environments

The backend uses one Prisma schema and migration history per database provider:

- Local development and testing: SQLite (`DATABASE_ENV=sqlite`). The original SQLite URL is kept as `DATABASE_URL_SQLITE`; its existing migration files are in `prisma/migrations-sqlite`.
- Production: MySQL (`DATABASE_ENV=mysql`). Configure the required `MYSQL_*` variables from a secret manager using `.env.production.example` as the variable checklist. The MySQL account must not be `root`, and the database must be `flame_crust`.

Production startup refuses to select SQLite. In development, SQLite is the default if `DATABASE_ENV` is omitted. Set `DATABASE_ENV=mysql` explicitly to opt into MySQL outside production.

## Prisma commands

Run from `backend/`:

```sh
npm run db:sqlite:generate
npm run db:sqlite:status
npm run db:sqlite:migrate
npm run db:sqlite:migrate:dev
npm run db:sqlite:studio

npm run db:mysql:generate
npm run db:mysql:status
npm run db:mysql:migrate
npm run db:mysql:migrate:dev
npm run db:mysql:studio
```

`migrate` uses `migrate deploy`; `migrate:dev` creates and applies migrations. Neither runs automatically when the server starts. Review MySQL migration SQL and back up the target before deliberately running `db:mysql:migrate`. Do not point the SQLite config at MySQL or the MySQL config at SQLite.

The initial MySQL migration is generated offline in `prisma/migrations-mysql/0001_init`. It is separate from the preserved SQLite migration history. Confirm the MySQL database is empty or baseline its existing schema before applying that initial migration.

## SQLite to MySQL data transfer

`scripts/transfer-sqlite-to-mysql.js` is a dry-run-first transfer utility. It reports table row counts, refuses to write if any application table in MySQL is non-empty, and preserves primary keys and relation IDs by inserting parent rows before dependent rows in one MySQL transaction. The transfer is never run by the application or migration scripts.

For a transfer, stop application writes, take restorable backups of both databases, deploy/review the MySQL schema, and run the script once without flags to inspect counts. Only after explicit approval, run:

```sh
npx tsx scripts/transfer-sqlite-to-mysql.js --execute --confirm-empty-target
```

Verify source and target row counts, order/contact relationships, and representative application behavior before reopening writes. If the target contains data, stop and plan a conflict-aware merge instead of bypassing the empty-target guard.
