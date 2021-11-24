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
    const { idUser } = req.params;
    const board = req.body;
    const newBoard = await Board.create(board);
    const user: any = await User.findByIdAndUpdate(idUser);
    if (!user) {
      debug(chalk.redBright("User not found"));
      const error = newError(404, "User not found");
      next(error);
    } else {
      user.boards.push(newBoard);
      user.save(user);

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
    const { idUser, idBoard } = req.params;
    const foundBoard = await Board.findByIdAndDelete(idBoard);
    if (!foundBoard) {
      const error = newError(404, "Board not found");
      next(error);
    } else {
      const user = await User.updateOne(
        { _id: idUser },
        { $pull: { boards: idBoard } }
      );
      if (!user) {
        const error = newError(404, "User not found");
        next(error);
      } else {
        res.status(200).json();
      }
    }
  } catch {
    const error = newError(404, "Board deletion failed");
    next(error);
  }
};