import chalk from "chalk";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import Debug from "debug";
import { notFoundErrorHandler, generalErrorHandler } from "./middleware/errors";

const debug = Debug("irenotion:server:index");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

let server: any;
const initializeServer: Function = async (port: string | number) =>
  new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      debug(chalk.magentaBright(`Listening to port ${port}`));
      resolve(server);
    });

    server.on("error", (error: { code: string | number }) => {
      debug(chalk.bgRedBright("Error when initializing server."));
      if (error.code === "EADDRINUSE") {
        debug(chalk.bgRedBright(`Port ${port} in use.`));
      }
      reject(error);
    });

    server.on("close", () => {
      debug(chalk.yellowBright("Server disconnected"));
    });
  });

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

export default initializeServer;
