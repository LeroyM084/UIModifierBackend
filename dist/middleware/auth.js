import { jwtService } from "../services/jwt.service.js";
export function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or invalid authorization header" });
    }
    const token = authHeader.slice(7);
    try {
        req.user = jwtService.verifyAccessToken(token);
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
//# sourceMappingURL=auth.js.map