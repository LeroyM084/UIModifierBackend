import { HttpError } from "../lib/http-error.js";
import { userRepository } from "../repositories/index.js";
export const userService = {
    async register(username, email, password) {
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new HttpError(409, "User already exists");
        }
        return userRepository.create({ username, email, password });
    },
    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user || user.password !== password) {
            throw new HttpError(401, "Invalid credentials");
        }
        return user;
    },
};
//# sourceMappingURL=user.service.js.map