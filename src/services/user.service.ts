import bcryptjs from "bcryptjs";
import { HttpError } from "../lib/http-error.js";
import { userRepository } from "../repositories/index.js";
import { jwtService } from "./jwt.service.js";
import type { User } from "../models/index.js";

export type UserPublic = Omit<User, "password">;

export const userService = {
  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<UserPublic> {
    if (!username || !email || !password) {
      throw new HttpError(400, "Username, email, and password are required");
    }

    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new HttpError(409, "Email already in use");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    const { password: _, ...publicUser } = user;
    return publicUser;
  },

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserPublic }> {
    if (!email || !password) {
      throw new HttpError(400, "Email and password are required");
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new HttpError(401, "Invalid credentials");
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpError(401, "Invalid credentials");
    }

    const accessToken = jwtService.generateAccessToken(user.id, user.username);
    const refreshToken = jwtService.generateRefreshToken(user.id);

    const { password: _, ...publicUser } = user;
    return { accessToken, refreshToken, user: publicUser };
  },

  async refresh(refreshToken: string): Promise<{ accessToken: string }> {
    const payload = jwtService.verifyRefreshToken(refreshToken);
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw new HttpError(401, "User not found");
    }

    const accessToken = jwtService.generateAccessToken(user.id, user.username);
    return { accessToken };
  },
};

