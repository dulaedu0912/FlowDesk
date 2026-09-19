import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

const start = async () => {
  await connectDB();
  app.listen(env.PORT, () => logger.info(`FlowDesk server on port ${env.PORT}`));
};
start();
