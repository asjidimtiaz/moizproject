import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import { pinoHttp } from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

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

app.use(express.static(path.join(process.cwd(), "artifacts", "daycare-website", "dist", "public")));

// Catch-all fallback for React Single Page Application
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(process.cwd(), "artifacts", "daycare-website", "dist", "public", "index.html"));
  } else {
    next();
  }
});

export default app;
