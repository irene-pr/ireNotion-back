import * as express from "express";
import Debug from "debug";
import chalk from "chalk";

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
  debug(
    chalk.red("An error has ocurred: "),
    chalk.red(JSON.stringify(error.details))
  );
  const message = error.message ? error.message : "Internal Server Error";
  res.status(error.statusCode ?? error.code ?? 500).json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
