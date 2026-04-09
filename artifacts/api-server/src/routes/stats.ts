import { Router, Request, Response } from "express";
import { db, programsTable, enrollmentsTable, staffTable } from "@workspace/db";
import { GetStatsResponse } from "@workspace/api-zod";
import { eq, count, sum } from "drizzle-orm";

const router = Router();

router.get("/stats", async (_req: any, res: any): Promise<void> => {
  const [programResult] = await db.select({ count: count() }).from(programsTable);
  const [staffResult] = await db.select({ count: count() }).from(staffTable);
  const [enrollmentResult] = await db.select({ count: count() }).from(enrollmentsTable);
  const [pendingResult] = await db
    .select({ count: count() })
    .from(enrollmentsTable)
    .where(eq(enrollmentsTable.status, "pending"));

  const programs = await db.select().from(programsTable);
  const totalChildren = programs.reduce((sum, p) => sum + p.enrolled, 0);
  const totalCapacity = programs.reduce((sum, p) => sum + p.capacity, 0);
  const availableSpots = totalCapacity - totalChildren;

  const stats = {
    totalChildren,
    totalStaff: staffResult.count,
    totalPrograms: programResult.count,
    yearsInOperation: 15,
    availableSpots: Math.max(0, availableSpots),
    totalEnrollments: enrollmentResult.count,
    pendingEnrollments: pendingResult.count,
    satisfactionRate: 98.5,
  };

  res.json(GetStatsResponse.parse(stats));
});

export default router;
