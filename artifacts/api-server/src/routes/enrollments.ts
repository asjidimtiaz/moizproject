import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, enrollmentsTable, programsTable } from "@workspace/db";
import {
  CreateEnrollmentBody,
  ListEnrollmentsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/enrollments", async (_req, res): Promise<void> => {
  const enrollments = await db.select().from(enrollmentsTable).orderBy(enrollmentsTable.createdAt);
  res.json(ListEnrollmentsResponse.parse(enrollments));
});

router.post("/enrollments", async (req, res): Promise<void> => {
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

export default router;
