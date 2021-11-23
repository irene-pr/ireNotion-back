import dotenv from "dotenv";
import initializeServer from "./server/index";

dotenv.config();

const port = process.env.PORT ?? 5000;

(async () => {
  try {
    console.log("hola");
    await initializeServer(port);
    console.log("hola2");
  } catch (error) {
    process.exit(1);
  }
})();
