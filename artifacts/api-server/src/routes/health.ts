import { Router, Request, Response } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { checkDatabaseConnection } from "@workspace/db";

const router = Router();

router.get("/healthz", async (_req: any, res: any) => {
  const dbStatus = await checkDatabaseConnection();
  
  const status = dbStatus.ok ? "ok" : "degraded";
  
  res.json({
    status,
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: process.env.NODE_ENV || "unknown"
  });
});

export default router;

