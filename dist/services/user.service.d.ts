import type { User } from "../models/index.js";
export type UserPublic = Omit<User, "password">;
export declare const userService: {
    register(username: string, email: string, password: string): Promise<UserPublic>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: UserPublic;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map