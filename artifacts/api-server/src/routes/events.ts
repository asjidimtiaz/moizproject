import { Router, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db, eventsTable } from "@workspace/db";
import { ListEventsResponse } from "@workspace/api-zod";
import { z } from "zod";

const router = Router();

// Minimal validation for incoming request
const CreateEventBody = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  location: z.string(),
  type: z.enum(["open-house", "holiday", "workshop", "field-trip", "celebration"]),
});

router.get("/events", async (_req: Request, res: Response): Promise<void> => {
  const events = await db.select().from(eventsTable).orderBy(eventsTable.date);
  res.json(ListEventsResponse.parse(events));
});

router.post("/events", async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateEventBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues });
    return;
  }
  const [event] = await db.insert(eventsTable).values(parsed.data).returning();
  res.status(201).json(event);
});

router.delete("/events/:id", async (req: Request, res: Response): Promise<void> => {
  const idValue = parseInt(String(req.params.id), 10);
  if (isNaN(idValue)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [deletedEvent] = await db.delete(eventsTable).where(eq(eventsTable.id, idValue)).returning();
  if (!deletedEvent) {
    res.status(404).json({ error: "Event not found" });
    return;
  }
  res.status(204).send();
});

export default router;
