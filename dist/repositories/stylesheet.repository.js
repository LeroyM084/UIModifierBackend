import { pool } from "../config/pool.js";
function toStylesheet(row) {
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
    async create(input) {
        const result = await pool.query(`INSERT INTO stylesheets (user_id, name, css_content, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, name, css_content, is_active, created_at, updated_at`, [input.userId ?? null, input.name ?? null, input.cssContent ?? null, input.isActive ?? true]);
        return toStylesheet(result.rows[0]);
    },
    async findById(id) {
        const result = await pool.query(`SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE id = $1
       LIMIT 1`, [id]);
        return result.rows[0] ? toStylesheet(result.rows[0]) : null;
    },
    async findByUserId(userId) {
        const result = await pool.query(`SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE user_id = $1
       ORDER BY created_at DESC, id DESC`, [userId]);
        return result.rows.map((row) => toStylesheet(row));
    },
    async findByUserIdAndName(userId, name) {
        const result = await pool.query(`SELECT id, user_id, name, css_content, is_active, created_at, updated_at
       FROM stylesheets
       WHERE user_id = $1 AND name = $2
       LIMIT 1`, [userId, name]);
        return result.rows[0] ? toStylesheet(result.rows[0]) : null;
    },
    async update(id, input) {
        const result = await pool.query(`UPDATE stylesheets
       SET
         user_id = COALESCE($2, user_id),
         name = COALESCE($3, name),
         css_content = COALESCE($4, css_content),
         is_active = COALESCE($5, is_active),
         updated_at = now()
       WHERE id = $1
       RETURNING id, user_id, name, css_content, is_active, created_at, updated_at`, [id, input.userId ?? null, input.name ?? null, input.cssContent ?? null, input.isActive ?? null]);
        return result.rows[0] ? toStylesheet(result.rows[0]) : null;
    },
    async delete(id) {
        await pool.query("DELETE FROM stylesheets WHERE id = $1", [id]);
    },
};
//# sourceMappingURL=stylesheet.repository.js.map