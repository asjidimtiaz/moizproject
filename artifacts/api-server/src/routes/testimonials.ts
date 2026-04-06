import { Router, type IRouter, type Request, type Response } from "express";
import { db, testimonialsTable } from "@workspace/db";
import { ListTestimonialsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/testimonials", async (_req: Request, res: Response): Promise<void> => {
  const testimonials = await db.select().from(testimonialsTable).orderBy(testimonialsTable.createdAt);
  res.json(ListTestimonialsResponse.parse(testimonials));
});

export default router;
