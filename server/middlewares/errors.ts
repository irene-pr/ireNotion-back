import * as express from "express";
import Debug from "debug";
import chalk from "chalk";
import { ValidationError } from "express-validation";

const debug = Debug("irenotion:server:errors");

const notFoundErrorHandler = (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: "Not found" });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (
  error: any,
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: express.NextFunction
) => {
  if (error instanceof ValidationError) {
    debug(chalk.red(error));
  }
  debug(chalk.red("An error has ocurred: "), chalk.red(error.message));
  const message = error.message ? error.message : "Wow";
  res.status(error.statusCode ?? error.code ?? 500).json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
