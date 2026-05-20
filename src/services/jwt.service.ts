import jwt, { type SignOptions } from "jsonwebtoken";
import { HttpError } from "../lib/http-error.js";

const getAccessSecret = (): string => process.env.JWT_ACCESS_SECRET || "access-secret";
const getRefreshSecret = (): string => process.env.JWT_REFRESH_SECRET || "refresh-secret";
const getAccessExpires = (): string => process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const getRefreshExpires = (): string => process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export interface TokenPayload {
  userId: number;
  username: string;
}

export const jwtService = {
  generateAccessToken(userId: number, username: string): string {
    const secret: string = getAccessSecret();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      expiresIn: getAccessExpires(),
    };
    return jwt.sign({ userId, username }, secret, options);
  },

  generateRefreshToken(userId: number): string {
    const secret: string = getRefreshSecret();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      expiresIn: getRefreshExpires(),
    };
    return jwt.sign({ userId }, secret, options);
  },

  verifyAccessToken(token: string): TokenPayload {
    try {
      const secret: string = getAccessSecret();
      return jwt.verify(token, secret) as TokenPayload;
    } catch {
      throw new HttpError(401, "Invalid or expired access token");
    }
  },

  verifyRefreshToken(token: string): { userId: number } {
    try {
      const secret: string = getRefreshSecret();
      return jwt.verify(token, secret) as { userId: number };
    } catch {
      throw new HttpError(401, "Invalid or expired refresh token");
    }
  },
};
