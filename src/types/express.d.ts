import type { TokenPayload } from "../services/jwt.service.js";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
