import express from "express";
import cors from "cors";
import path from "path";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app = express() as any;

// Startup verification
const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (dbUrl) {
  logger.info("Environment: DATABASE_URL is detected");
} else {
  logger.warn("Environment: DATABASE_URL is NOT detected!");
}


app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req: IncomingMessage) {
        return {
          id: (req as any).id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: ServerResponse) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api", router);

app.use(express.static(path.join(process.cwd(), "public")));

// Catch-all fallback for React Single Page Application
app.use((req: any, res: any, next: any) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
  } else {
    next();
  }
});

// Global API Error Handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error("API Error encountered:", err);
  if (req.path.startsWith('/api')) {
    res.status(500).json({ error: err.message || "Internal Server Error", stack: err.stack });
  } else {
    next(err);
  }
});

export default app;
