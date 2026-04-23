import { Pool } from "pg";
import "dotenv/config";
import { Kysely, PostgresDialect } from "kysely";
import type { DB } from "./kysely/types/types.js";

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});

export const db = new Kysely<DB>({ dialect });
