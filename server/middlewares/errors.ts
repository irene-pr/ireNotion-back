import * as express from "express";
import Debug from "debug";
import chalk from "chalk";

const debug = Debug("irenotion:server:errors");

const notFoundErrorHandler = (req: any, res: express.Response) => {
  res.status(404).json({ error: "Endpoint not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
) => {
  debug(chalk.red("An error has ocurred: "), chalk.red(error.message));
  const message = error.message ?? "Wow";
  res.status(error.code || 500).json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
