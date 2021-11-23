import { port, dataBaseString } from "./utils/environtmentVariables";
import initializeServer from "./server/index";
import connectDB from "./database";

(async () => {
  try {
    await connectDB(dataBaseString);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
