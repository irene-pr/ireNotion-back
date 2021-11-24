import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { secret } from "../../utils/environtmentVariables";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:middlewares:auth");

const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
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

export default auth;
