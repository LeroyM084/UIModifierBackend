import type { CreateUserInput, User } from "../models/index.js";
export declare const userRepository: {
    create(input: CreateUserInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
};
//# sourceMappingURL=user.repository.d.ts.map