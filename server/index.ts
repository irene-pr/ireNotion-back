const chalk = require("chalk");
const debug = require("debug")("irenotion:server:index");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middleware/errors");

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

    server.on("error", (error: { code: string }) => {
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
