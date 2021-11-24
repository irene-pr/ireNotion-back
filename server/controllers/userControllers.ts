import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:controllers:user");

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = req.body;
    const user = await User.findOne({ username: newUser.username });
    if (user) {
      debug(chalk.redBright("Username already exists"));
      const error = newError(400, "Username already exists");
      next(error);
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const addedUser = await User.create(newUser);
      res.json(addedUser).status(201);
    }
  } catch {
    const error = newError(400, "User registration failed");
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      debug(chalk.redBright("Wrong credentials"));
      const error = newError(401, "Wrong credentials");
      next(error);
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        debug(chalk.redBright("Wrong credentials"));
        const error = newError(401, "Wrong credentials");
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          "pongo un string temporalmente hasta solucionar el problema de sobrecarga",
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        res.json({ token });
      }
    }
  } catch {
    const error = newError(400, "User login failed");
    next(error);
  }
};
