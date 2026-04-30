import { pool } from "../config/pool.js";
import type { CreateUserInput, User } from "../models/index.js";

type UserRow = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date | null;
};

function toUser(row: UserRow): User {
  return {
    id: row.id,
    username: row.username,
    email: row.email,
    password: row.password,
    createdAt: row.created_at,
  };
}

export const userRepository = {
  async create(input: CreateUserInput): Promise<User> {
    const result = await pool.query<UserRow>(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, password, created_at`,
      [input.username, input.email, input.password],
    );

    return toUser(result.rows[0]!);
  },

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query<UserRow>(
      `SELECT id, username, email, password, created_at
       FROM users
       WHERE email = $1
       LIMIT 1`,
      [email],
    );

    return result.rows[0] ? toUser(result.rows[0]) : null;
  },

  async findById(id: number): Promise<User | null> {
    const result = await pool.query<UserRow>(
      `SELECT id, username, email, password, created_at
       FROM users
       WHERE id = $1
       LIMIT 1`,
      [id],
    );

    return result.rows[0] ? toUser(result.rows[0]) : null;
  },
};
