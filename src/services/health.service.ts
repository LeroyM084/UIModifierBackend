import type { HealthStatus } from "../models/health.model.js";

export const healthService = {
  getStatus(): HealthStatus {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  },
};
