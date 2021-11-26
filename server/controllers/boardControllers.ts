import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import Board from "../../database/models/Board";
import User from "../../database/models/User";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:controllers:board");

export const createBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const board = req.body;
    const newBoard = await Board.create(board);
    const user: any = await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { boards: newBoard.id } }
    );
    if (!user) {
      debug(chalk.redBright("User not found"));
      const error = newError(404, "User not found");
      next(error);
    } else {
      res.status(204).json();
    }
  } catch {
    const error = newError(400, "Could not create a new board");
    next(error);
  }
};

export const deleteBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idBoard } = req.params;
    const foundBoard = await Board.findById(idBoard);
    if (!foundBoard) {
      const error = newError(404, "Board not found");
      next(error);
    } else {
      const user = await User.updateOne(
        { _id: req.userId },
        { $pull: { boards: idBoard } }
      );
      if (!user) {
        const error = newError(404, "User not found");
        next(error);
      } else {
        await Board.findByIdAndDelete(idBoard);
        res.json().status(200);
      }
    }
  } catch {
    const error = newError(400, "Board deletion failed");
    next(error);
  }
};
