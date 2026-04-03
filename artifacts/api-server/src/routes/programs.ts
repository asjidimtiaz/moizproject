import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, programsTable } from "@workspace/db";
import {
  CreateProgramBody,
  GetProgramParams,
  GetProgramResponse,
  ListProgramsResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/programs", async (_req, res): Promise<void> => {
  const programs = await db.select().from(programsTable).orderBy(programsTable.id);
  res.json(ListProgramsResponse.parse(programs));
});

router.post("/programs", async (req, res): Promise<void> => {
  const parsed = CreateProgramBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [program] = await db.insert(programsTable).values(parsed.data).returning();
  res.status(201).json(GetProgramResponse.parse(program));
});

router.get("/programs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetProgramParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [program] = await db.select().from(programsTable).where(eq(programsTable.id, params.data.id));
  if (!program) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  res.json(GetProgramResponse.parse(program));
});

export default router;
