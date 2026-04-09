import { Router, Request, Response } from "express";
import { db, staffTable } from "@workspace/db";
import { ListStaffResponse } from "@workspace/api-zod";

const router = Router();

router.get("/staff", async (_req: any, res: any): Promise<void> => {
  const staff = await db.select().from(staffTable).orderBy(staffTable.id);
  res.json(ListStaffResponse.parse(staff));
});

export default router;
