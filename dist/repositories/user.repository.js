import { pool } from "../config/pool.js";
function toUser(row) {
    return {
        id: row.id,
        username: row.username,
        email: row.email,
        password: row.password,
        createdAt: row.created_at,
    };
}
export const userRepository = {
    async create(input) {
        const result = await pool.query(`INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email, password, created_at`, [input.username, input.email, input.password]);
        return toUser(result.rows[0]);
    },
    async findByEmail(email) {
        const result = await pool.query(`SELECT id, username, email, password, created_at
       FROM users
       WHERE email = $1
       LIMIT 1`, [email]);
        return result.rows[0] ? toUser(result.rows[0]) : null;
    },
    async findById(id) {
        const result = await pool.query(`SELECT id, username, email, password, created_at
       FROM users
       WHERE id = $1
       LIMIT 1`, [id]);
        return result.rows[0] ? toUser(result.rows[0]) : null;
    },
};
//# sourceMappingURL=user.repository.js.map