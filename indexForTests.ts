import { dataBaseTestString } from "./utils/environtmentVariables";
import initializeServer from "./server/index";
import connectDB from "./database";

(async () => {
  try {
    await connectDB(dataBaseTestString);
    await initializeServer(1000);
  } catch (error) {
    process.exit(1);
  }
})();
