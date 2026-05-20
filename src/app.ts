import type { Request, Response, NextFunction } from "express";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec, swaggerUiOptions } from "./config/swagger.js";
import { apiRouter } from "./routes/index.js";
import { HttpError } from "./lib/http-error.js";

export function createApp() {
  const app = express();

  app.use(express.json());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  app.use("/api", apiRouter);

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  });

  return app;
}
