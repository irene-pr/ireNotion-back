import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import Board from "../../database/models/Board";
import User from "../../database/models/User";
import newError from "../../utils/newError";
import { RequestAuth } from "../middlewares/auth";

const debug = Debug("irenotion:server:controllers:board");

export const createBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const board = req.body;
    const newBoard = await Board.create(board);
    const user: any = await User.findByIdAndUpdate({ id: req.userId });
    if (!user) {
      debug(chalk.redBright("User not found"));
      const error = newError(401, "User not found");
      next(error);
    } else {
      user.boards.push(newBoard);
      user.save(user);

      res.status(204).json({ user, newBoard });
    }
  } catch {
    const error = newError(401, "Could not create new board");
    next(error);
  }
};

export const deleteBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const foundBoard = await Board.findByIdAndDelete(id);
    if (!foundBoard) {
      const error = newError(404, "Board not found");
      next(error);
    } else {
      const user: any = await User.findByIdAndUpdate({ id: req.userId });
      if (!user) {
        const error = newError(404, "User not found");
        next(error);
      } else {
        user.boards.filter((board: any) => board.id !== id);
        user.save(user);
        res.status(202).json({ user, foundBoard });
      }
    }
  } catch {
    const error = newError(404, "Board deletion failed");
    next(error);
  }
};
