import "dotenv/config";
import { createApp } from "./app.js";
import { connectToDatabase } from "./config/database.js";

const port = Number(process.env.PORT || 3000);
const app = createApp();

async function bootstrap() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Database connection failed at startup:", error);
    process.exit(1);
  }
}

void bootstrap();
