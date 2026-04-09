import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db, enrollmentsTable, programsTable } from "@workspace/db";
import {
  CreateEnrollmentBody,
  ListEnrollmentsResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/enrollments", async (_req: Request, res: Response): Promise<void> => {
  const enrollments = await db.select().from(enrollmentsTable).orderBy(enrollmentsTable.createdAt);
  res.json(ListEnrollmentsResponse.parse(enrollments));
});

router.post("/enrollments", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateEnrollmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [program] = await db.select().from(programsTable).where(eq(programsTable.id, parsed.data.programId));
  if (!program) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  const [enrollment] = await db.insert(enrollmentsTable).values({
    ...parsed.data,
    programName: program.name,
    status: "pending",
  }).returning();
  res.status(201).json(enrollment);
});

router.delete("/enrollments/:id", async (req: Request, res: Response): Promise<void> => {
  const idValue = parseInt(String(req.params.id), 10);
  if (isNaN(idValue)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deletedEnrollment] = await db.delete(enrollmentsTable).where(eq(enrollmentsTable.id, idValue)).returning();
  if (!deletedEnrollment) {
    res.status(404).json({ error: "Enrollment not found" });
    return;
  }
  res.status(204).send();
});

export default router;
