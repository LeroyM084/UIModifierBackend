import { pool } from "../config/pool.js";
function toTarget(row) {
    return {
        id: row.id,
        stylesheetId: row.stylesheet_id,
        urlPattern: row.url_pattern,
    };
}
export const targetRepository = {
    async create(input) {
        const result = await pool.query(`INSERT INTO targets (stylesheet_id, url_pattern)
       VALUES ($1, $2)
       RETURNING id, stylesheet_id, url_pattern`, [input.stylesheetId ?? null, input.urlPattern ?? null]);
        return toTarget(result.rows[0]);
    },
    async findByStylesheetId(stylesheetId) {
        const result = await pool.query(`SELECT id, stylesheet_id, url_pattern
       FROM targets
       WHERE stylesheet_id = $1
       ORDER BY id ASC`, [stylesheetId]);
        return result.rows.map((row) => toTarget(row));
    },
};
//# sourceMappingURL=target.repository.js.map