import type { Request, Response } from "express";
import { userService } from "../services/user.service.js";

export async function registerUser(request: Request, response: Response) {
  const { username, email, password } = request.body as {
    username?: string;
    email?: string;
    password?: string;
  };

  const user = await userService.register(username ?? "", email ?? "", password ?? "");
  response.status(201).json(user);
}

export async function loginUser(request: Request, response: Response) {
  const { email, password } = request.body as { email?: string; password?: string };

  const user = await userService.login(email ?? "", password ?? "");
  response.status(200).json(user);
}

