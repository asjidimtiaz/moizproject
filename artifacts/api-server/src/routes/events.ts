import { Router, type IRouter } from "express";
import { db, eventsTable } from "@workspace/db";
import { ListEventsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/events", async (_req, res): Promise<void> => {
  const events = await db.select().from(eventsTable).orderBy(eventsTable.date);
  res.json(ListEventsResponse.parse(events));
});

export default router;
