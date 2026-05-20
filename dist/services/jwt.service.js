import jwt, {} from "jsonwebtoken";
import { HttpError } from "../lib/http-error.js";
const getAccessSecret = () => process.env.JWT_ACCESS_SECRET || "access-secret";
const getRefreshSecret = () => process.env.JWT_REFRESH_SECRET || "refresh-secret";
const getAccessExpires = () => process.env.JWT_ACCESS_EXPIRES_IN || "15m";
const getRefreshExpires = () => process.env.JWT_REFRESH_EXPIRES_IN || "7d";
export const jwtService = {
    generateAccessToken(userId, username) {
        const secret = getAccessSecret();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = {
            expiresIn: getAccessExpires(),
        };
        return jwt.sign({ userId, username }, secret, options);
    },
    generateRefreshToken(userId) {
        const secret = getRefreshSecret();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = {
            expiresIn: getRefreshExpires(),
        };
        return jwt.sign({ userId }, secret, options);
    },
    verifyAccessToken(token) {
        try {
            const secret = getAccessSecret();
            return jwt.verify(token, secret);
        }
        catch {
            throw new HttpError(401, "Invalid or expired access token");
        }
    },
    verifyRefreshToken(token) {
        try {
            const secret = getRefreshSecret();
            return jwt.verify(token, secret);
        }
        catch {
            throw new HttpError(401, "Invalid or expired refresh token");
        }
    },
};
//# sourceMappingURL=jwt.service.js.map