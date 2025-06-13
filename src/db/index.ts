import type { ExtractTablesWithRelations } from "drizzle-orm";
import { drizzle, type NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from "./schema";

export const db = drizzle({
  connection: {
    uri: process.env.DATABASE_URL,
  },
});

export type DatabaseType = typeof db;
