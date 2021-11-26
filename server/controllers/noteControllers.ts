import chalk from "chalk";
import { NextFunction, Response } from "express";
import Debug from "debug";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

const debug = Debug("irenotion:server:controllers:note");

export const createNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { note, idBoard } = req.body;
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

export const deleteNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idBoard, idNote } = req.params;
    const foundNote = await Note.findById(idNote);
    if (!foundNote) {
      const error = newError(404, "Note not found");
      next(error);
    } else {
      const board = await Board.updateOne(
        { _id: idBoard },
        { $pull: { notes: idNote } }
      );
      if (!board) {
        const error = newError(404, "Board not found");
        next(error);
      } else {
        await Note.findByIdAndDelete(idNote);
        res.status(200).json();
      }
    }
  } catch {
    const error = newError(400, "Note deletion failed");
    next(error);
  }
};

export const updateNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { updatedNoteBody } = req.body;
    let foundNote: any = await Note.findByIdAndUpdate(updatedNoteBody.id);
    if (!foundNote) {
      debug(chalk.redBright("Note not found"));
      const error = newError(404, "Note not found");
      next(error);
    } else {
      foundNote = updatedNoteBody;
      foundNote.save(foundNote);
      res.status(204).json(foundNote);
    }
  } catch {
    const error = newError(400, "Could not update a new note");
    next(error);
  }
};
