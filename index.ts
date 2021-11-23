import dotenv from "dotenv";

dotenv.config();
// eslint-disable-next-line import/first
import initializeServer from "./server/index";

const port = process.env.PORT ?? 5000;

(async () => {
  try {
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
