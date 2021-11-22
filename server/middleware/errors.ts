import * as express from "express";

const chalk = require("chalk");
const debug = require("debug")("file:server:errors");

const notFoundErrorHandler = (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-var
  next: any
) => {
  debug(chalk.red("An error has ocurred: "), chalk.red(error.message));
  const message = error.code ? error.message : "Wow";
  res.status(error.code || 500).json({ error: message });
};

export default {
  notFoundErrorHandler,
  generalErrorHandler,
};
