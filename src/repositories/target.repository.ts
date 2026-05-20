import { pool } from "../config/pool.js";
import type { CreateTargetInput, Target } from "../models/index.js";

type TargetRow = {
  id: number;
  stylesheet_id: number | null;
  url_pattern: string | null;
};

function toTarget(row: TargetRow): Target {
  return {
    id: row.id,
    stylesheetId: row.stylesheet_id,
    urlPattern: row.url_pattern,
  };
}

export const targetRepository = {
  async create(input: CreateTargetInput): Promise<Target> {
    const result = await pool.query<TargetRow>(
      `INSERT INTO targets (stylesheet_id, url_pattern)
       VALUES ($1, $2)
       RETURNING id, stylesheet_id, url_pattern`,
      [input.stylesheetId ?? null, input.urlPattern ?? null],
    );

    return toTarget(result.rows[0]!);
  },

  async findByStylesheetId(stylesheetId: number): Promise<Target[]> {
    const result = await pool.query<TargetRow>(
      `SELECT id, stylesheet_id, url_pattern
       FROM targets
       WHERE stylesheet_id = $1
       ORDER BY id ASC`,
      [stylesheetId],
    );

    return result.rows.map((row) => toTarget(row));
  },

  async deleteByStylesheetId(stylesheetId: number): Promise<void> {
    await pool.query("DELETE FROM targets WHERE stylesheet_id = $1", [stylesheetId]);
  },
};
