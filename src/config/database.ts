import net from "node:net";

type DatabaseConfig = {
  host: string;
  port: number;
  user?: string;
  password?: string;
  database?: string;
};

function parseDatabaseUrl(databaseUrl: string): DatabaseConfig {
  const url = new URL(databaseUrl);

  return {
    host: url.hostname,
    port: Number(url.port || 5432),
    ...(url.username ? { user: decodeURIComponent(url.username) } : {}),
    ...(url.password ? { password: decodeURIComponent(url.password) } : {}),
    ...(url.pathname.replace(/^\//, "") ? { database: url.pathname.replace(/^\//, "") } : {}),
  };
}

export async function connectToDatabase(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not defined");
  }

  const { host, port } = parseDatabaseUrl(databaseUrl);

  await new Promise<void>((resolve, reject) => {
    const socket = net.createConnection({ host, port });

    socket.once("connect", () => {
      socket.end();
      resolve();
    });

    socket.once("error", (error) => {
      socket.destroy();
      reject(error);
    });
  });
}
