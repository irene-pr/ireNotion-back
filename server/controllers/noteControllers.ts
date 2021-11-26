import chalk from "chalk";
import { NextFunction, Response } from "express";
import Debug from "debug";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:controllers:note");

const createNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idBoard } = req.params;
    const note = req.body;
    const newNote = await Note.create(note);
    const board: any = await Board.findByIdAndUpdate(idBoard);
    if (!board) {
      debug(chalk.redBright("Board not found"));
      const error = newError(404, "Board not found");
      next(error);
    } else {
      board.notes.push(newNote);
      board.save(board);
      res.status(204).json();
    }
  } catch {
    const error = newError(400, "Could not create a new note");
    next(error);
  }
};

export default createNote;
