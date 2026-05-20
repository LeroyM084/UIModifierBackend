export interface TokenPayload {
    userId: number;
    username: string;
}
export declare const jwtService: {
    generateAccessToken(userId: number, username: string): string;
    generateRefreshToken(userId: number): string;
    verifyAccessToken(token: string): TokenPayload;
    verifyRefreshToken(token: string): {
        userId: number;
    };
};
//# sourceMappingURL=jwt.service.d.ts.map