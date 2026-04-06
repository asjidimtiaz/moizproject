import { pgTable, text, serial, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const staffTable = pgTable("staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  bio: text("bio").notNull(),
  yearsExperience: integer("years_experience").notNull(),
  education: text("education").notNull(),
  imageUrl: text("image_url"),
  certifications: json("certifications").$type<string[]>().notNull().default([]),
});

export const insertStaffSchema = createInsertSchema(staffTable).omit({ id: true });
export type InsertStaff = z.infer<typeof insertStaffSchema>;
export type Staff = typeof staffTable.$inferSelect;

