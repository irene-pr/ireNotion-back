import { NextFunction, Response } from "express";
import Note from "../../database/models/Note";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

export const authorizationForNoteDeletion = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idNote } = req.params;
    const foundNote: any = await Note.findById(idNote);
    if (!foundNote) {
      const error = newError(404, "Note not found");
      next(error);
    } else if (`${foundNote.userId}` === req.userId) {
      return next();
    } else {
      const error = newError(404, "User not allowed");
      next(error);
    }
  } catch {
    const error = newError(404, "Failed Authorization to access note deletion");
    next(error);
  }
};

export const authorizationForNoteUpdate = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idNote } = req.body;
    const foundNote: any = await Note.findById(idNote);
    if (!foundNote) {
      const error = newError(404, "Note not found");
      next(error);
    } else if (`${foundNote.userId}` === req.userId) {
      return next();
    } else {
      const error = newError(404, "User not allowed");
      next(error);
    }
  } catch {
    const error = newError(404, "Failed Authorization to access note update");
    next(error);
  }
};
