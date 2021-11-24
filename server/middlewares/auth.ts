import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../../utils/environtmentVariables";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:middlewares:auth");

export interface RequestAuth extends Request {
  userId?: string;
}

export const auth = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    debug(chalk.redBright("No Authorization"));
    const error = newError(401, "No Authorization");
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      debug(chalk.redBright("No Token"));
      const error = newError(401, "No Token");
      next(error);
    } else {
      try {
        const user: any = await jwt.verify(token, secret);
        req.userId = user.id;
        next();
      } catch {
        const error = newError(401, "Token invalid");
        next(error);
      }
    }
  }
};
