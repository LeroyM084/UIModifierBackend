import { pool } from "../config/pool.js";
import type { CreateStylesheetInput, Stylesheet, UpdateStylesheetInput } from "../models/index.js";

type StylesheetRow = {
  id: number;
  user_id: number | null;
  name: string | null;
  css_content: string | null;
  is_active: boolean;
  created_at: Date | null;
  updated_at: Date | null;
};

function toStylesheet(row: StylesheetRow): Stylesheet {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    cssContent: row.css_content,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const stylesheetRepository = {
  async create(input: CreateStylesheetInput): Promise<Stylesheet> {
    const result = await pool.query<StylesheetRow>(
      `INSERT INTO stylesheets (user_id, name, css_content, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, name, css_content, is_active, created_at, updated_at`,
      [input.userId ?? null, input.name ?? null, input.cssContent ?? null, input.isActive ?? true],
    );

    return toStylesheet(result.rows[0]!);
  },

  async findById(id: number): Promise<Stylesheet | null> {
    const result = await pool.query<StylesheetRow>(
      `SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE id = $1
       LIMIT 1`,
      [id],
    );

    return result.rows[0] ? toStylesheet(result.rows[0]) : null;
  },

  async findByUserId(userId: number): Promise<Stylesheet[]> {
    const result = await pool.query<StylesheetRow>(
      `SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE user_id = $1
       ORDER BY created_at DESC, id DESC`,
      [userId],
    );

    return result.rows.map((row) => toStylesheet(row));
  },

  async findByUserIdAndName(userId: number, name: string): Promise<Stylesheet | null> {
    const result = await pool.query<StylesheetRow>(
      `SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE user_id = $1 AND name = $2
       LIMIT 1`,
      [userId, name],
    );

    return result.rows[0] ? toStylesheet(result.rows[0]) : null;
  },

  async update(id: number, input: UpdateStylesheetInput): Promise<Stylesheet | null> {
    const result = await pool.query<StylesheetRow>(
      `UPDATE stylesheets
       SET
         user_id = COALESCE($2, user_id),
         name = COALESCE($3, name),
         css_content = COALESCE($4, css_content),
         is_active = COALESCE($5, is_active),
         updated_at = now()
       WHERE id = $1
       RETURNING id, user_id, name, css_content, is_active, created_at, updated_at`,
      [id, input.userId ?? null, input.name ?? null, input.cssContent ?? null, input.isActive ?? null],
    );

    return result.rows[0] ? toStylesheet(result.rows[0]) : null;
  },
};
