import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/index.js";
import { sql as drizzleSql } from "drizzle-orm";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ POSTGRES_URL or DATABASE_URL is not set! You need a Vercel Postgres connection string to run the database.");
}

const client = neon(connectionString || "postgresql://user:password@localhost.tld/dbname");

export const db = drizzle({ client, schema });

/**
 * Diagnostic function to check if the database is reachable.
 * Returns information about the connection status or the error encountered.
 */
export async function checkDatabaseConnection() {
  if (!connectionString) {
    return { ok: false, error: "Missing connection string (DATABASE_URL/POSTGRES_URL)" };
  }
  
  try {
    // Perform a simple test query
    await db.execute(drizzleSql`SELECT 1`);
    return { ok: true, message: "Successfully connected to database" };
  } catch (error: any) {
    console.error("Database connection check failed:", error);
    return { ok: false, error: error.message || "Unknown database error" };
  }
}

export * from "./schema/index.js";


