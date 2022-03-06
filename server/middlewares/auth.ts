import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import RequestAuth from "../../types/RequestAuth";
import { secret } from "../../utils/environtmentVariables";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:middlewares:auth");

const auth = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.redBright("No Authorization"));
    const error = newError(401, "No Authorization");
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      debug(chalk.redBright("No Token"));
      const error = newError(401, "No Authorization");
      next(error);
    } else {
      try {
        const user = (await jwt.verify(token, secret)) as JwtPayload;
        req.userId = user.id;
        next();
      } catch {
        debug(chalk.redBright("Token invalid"));
        const error = newError(401, "No Authorization");
        next(error);
      }
    }
  }
};

export default auth;
