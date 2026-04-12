import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema/index";
import { sql as drizzleSql } from "drizzle-orm";

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("⚠️ POSTGRES_URL or DATABASE_URL is not set! You need a Neon connection string to run the database.");
}

// Ensure the neon client is only initialized if we have a string that looks valid
const client = neon(
  connectionString && connectionString.startsWith("postgres")
    ? connectionString
    : "postgresql://user:password@localhost.tld/dbname"
);

export const db = drizzle({ client, schema });

/**
 * Diagnostic function to check if the database is reachable.
 */
export async function checkDatabaseConnection() {
  if (!connectionString || !connectionString.startsWith("postgres")) {
    return { ok: false, error: "Missing or invalid connection string (DATABASE_URL/POSTGRES_URL)" };
  }
  
  try {
    await db.execute(drizzleSql`SELECT 1`);
    return { ok: true, message: "Successfully connected to database" };
  } catch (error: any) {
    console.error("Database connection check failed:", error);
    return { ok: false, error: error.message || "Unknown database error" };
  }
}

export * from "./schema/index";



