import { pgTable, text, serial, integer, real, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const programsTable = pgTable("programs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ageRange: text("age_range").notNull(),
  description: text("description").notNull(),
  schedule: text("schedule").notNull(),
  monthlyFee: real("monthly_fee").notNull(),
  capacity: integer("capacity").notNull(),
  enrolled: integer("enrolled").notNull().default(0),
  imageUrl: text("image_url"),
  features: json("features").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProgramSchema = createInsertSchema(programsTable).omit({ id: true, createdAt: true });
export type InsertProgram = z.infer<typeof insertProgramSchema>;
export type Program = typeof programsTable.$inferSelect;

