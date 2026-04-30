import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __uiModifierPool: Pool | undefined;
}

function createPool() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
  }

  return new Pool({ connectionString });
}

export const pool = globalThis.__uiModifierPool ?? createPool();

if (!globalThis.__uiModifierPool) {
  globalThis.__uiModifierPool = pool;
}

