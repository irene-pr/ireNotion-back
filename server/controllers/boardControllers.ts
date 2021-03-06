import chalk from "chalk";
import Debug from "debug";
import { NextFunction, Response } from "express";
import Board from "../../database/models/Board";
import User from "../../database/models/User";
import RequestAuth from "../../types/RequestAuth";
import { badRequest, notFound } from "../../utils/errorFunctions";
import { createdResponse, okResponse } from "../../utils/responses";

const debug = Debug("irenotion:server:controllers:board");

export const createBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const board = req.body;
    board.userId = req.userId;
    const newBoard = await Board.create(board);
    const user = await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { boards: newBoard.id } }
    );
    if (!user) {
      debug(chalk.redBright("User not found"));
      const error = notFound("User not found");
      next(error);
    } else {
      createdResponse(res, { message: "new board created successfully" });
    }
  } catch {
    const error = badRequest("Could not create a new board");
    next(error);
  }
};

export const deleteBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idBoard } = req.params;
    const foundBoard = await Board.findById(idBoard);
    if (!foundBoard) {
      const error = notFound("Board not found");
      next(error);
    } else {
      const user = await User.updateOne(
        { _id: req.userId },
        { $pull: { boards: idBoard } }
      );
      if (!user) {
        const error = notFound("User not found");
        next(error);
      } else {
        await Board.findByIdAndDelete(idBoard);
        okResponse(res, { message: "board deleted successfully" });
      }
    }
  } catch {
    const error = badRequest("Board deletion failed");
    next(error);
  }
};

export const updateBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idBoard, newName } = req.body;
    const foundBoard = await Board.findById(idBoard);
    if (!foundBoard) {
      debug(chalk.redBright("Board not found"));
      const error = notFound("Board not found");
      next(error);
    } else {
      await Board.findByIdAndUpdate(
        idBoard,
        { name: newName },
        {
          new: true,
        }
      );
      okResponse(res, { message: "board updated successfully" });
    }
  } catch {
    const error = badRequest("Could not update a new board");
    next(error);
  }
};
