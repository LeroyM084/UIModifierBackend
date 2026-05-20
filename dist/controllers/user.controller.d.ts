import type { Request, Response } from "express";
export declare function registerUser(request: Request, response: Response): Promise<void>;
export declare function loginUser(request: Request, response: Response): Promise<void>;
export declare function refreshToken(request: Request, response: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function logoutUser(request: Request, response: Response): Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map