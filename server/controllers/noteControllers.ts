import chalk from "chalk";
import { NextFunction, Response } from "express";
import Debug from "debug";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import { badRequest, notFound } from "../../utils/errorFunctions";
import RequestAuth from "../../types/RequestAuth";

const debug = Debug("irenotion:server:controllers:note");

export const createNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { note, idBoard } = req.body;
    note.userId = req.userId;
    const newNote = await Note.create(note);
    const board = await Board.updateOne(
      { _id: idBoard },
      { $push: { notes: newNote } }
    );
    if (!board) {
      debug(chalk.redBright("Board not found"));
      const error = notFound("Board not found");
      next(error);
    } else {
      res.status(204).json(board);
    }
  } catch {
    const error = badRequest("Could not create a new note");
    next(error);
  }
};

export const deleteNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idBoard, idNote } = req.params;
    const foundNote = await Note.findById(idNote);
    if (!foundNote) {
      const error = notFound("Note not found");
      next(error);
    } else {
      const board = await Board.updateOne(
        { _id: idBoard },
        { $pull: { notes: idNote } }
      );
      if (!board) {
        const error = notFound("Board not found");
        next(error);
      } else {
        await Note.findByIdAndDelete(idNote);
        res.status(200).json({ message: "deleted note successfully" });
      }
    }
  } catch {
    const error = badRequest("Note deletion failed");
    next(error);
  }
};

export const updateNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idNote, updatedNote } = req.body;
    let foundNote: any = await Note.findById(idNote);
    if (!foundNote) {
      debug(chalk.redBright("Note not found"));
      const error = notFound("Note not found");
      next(error);
    } else {
      foundNote = await Note.findByIdAndUpdate(idNote, updatedNote, {
        new: true,
      });
      res.status(204).json(foundNote);
    }
  } catch {
    const error = badRequest("Could not update a new note");
    next(error);
  }
};
