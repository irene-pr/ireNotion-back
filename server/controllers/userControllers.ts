import { NextFunction, Request, Response } from "express";
import Debug from "debug";
import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/User";
import {
  badRequest,
  conflict,
  notFound,
  unauthorized,
} from "../../utils/errorFunctions";
import { secret } from "../../utils/environtmentVariables";
import RequestAuth from "../../types/RequestAuth";
import { createdResponse, okResponse } from "../../utils/responses";

const debug = Debug("irenotion:server:controllers:user");

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newUser = req.body;
    const user = await User.findOne({ username: newUser.username });
    if (user) {
      debug(chalk.redBright("Username already exists"));
      const error = conflict("Username already exists");
      next(error);
    } else {
      newUser.password = await bcrypt.hash(newUser.password, 10);
      const addedUser = await User.create(newUser);
      createdResponse(res, addedUser);
    }
  } catch {
    const error = badRequest("User registration failed");
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      debug(chalk.redBright("Wrong credentials"));
      const error = unauthorized("Wrong credentials");
      next(error);
    } else {
      const rightPassword = await bcrypt.compare(password, user.password);
      if (!rightPassword) {
        debug(chalk.redBright("Wrong credentials"));
        const error = unauthorized("Wrong credentials");
        next(error);
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username,
          },
          secret,
          {
            expiresIn: 24 * 60 * 60,
          }
        );
        createdResponse(res, { token });
      }
    }
  } catch {
    const error = badRequest("User login failed");
    next(error);
  }
};

export const getUserContent = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({ _id: req.userId })
      .select(["name"])
      .populate({
        path: "boards",
        populate: {
          path: "notes",
        },
      });
    if (!user) {
      const error = notFound("User not found");
      return next(error);
    }
    okResponse(res, user);
  } catch {
    const error = badRequest("Could not get user content");
    next(error);
  }
};
