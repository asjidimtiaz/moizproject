import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL is not set in .env! You need a Vercel Postgres connection string to run the database.");
}

const sql = neon(process.env.DATABASE_URL || "postgresql://user:password@localhost.tld/dbname");

export const db = drizzle({ client: sql, schema });

export * from "./schema/index";

