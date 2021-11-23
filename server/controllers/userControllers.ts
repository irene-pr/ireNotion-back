import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import bcrypt from "bcrypt";
import User from "../../database/models/User";
import newError from "../../utils/errorCreator";

const debug = Debug("irenotion:server:index");

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;
    const user = await User.findOne({ username: newUser.username });
    if (user) {
      debug(chalk.redBright("Username already taken"));
      const error = newError(400, "Username already exists");
      next(error);
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      User.create(newUser);
      res.json().status(201);
    }
  } catch {
    const error = newError(400, "User registration failed");
    next(error);
  }
};

export default registerUser;
