import { Router } from "express";
import { getHealth } from "../controllers/health.controller.js";
import {
  getSchema,
  listSchemasByUser,
  saveSchema,
  updateSchema,
} from "../controllers/stylesheet.controller.js";
import { loginUser, registerUser } from "../controllers/user.controller.js";

export const apiRouter = Router();

apiRouter.get("/health", getHealth);
apiRouter.post("/users", registerUser);
apiRouter.post("/users/login", loginUser);
apiRouter.post("/schemas", saveSchema);
apiRouter.get("/schemas/:userId", listSchemasByUser);
apiRouter.get("/schemas/:userId/:name", getSchema);
apiRouter.patch("/schemas/:id", updateSchema);
