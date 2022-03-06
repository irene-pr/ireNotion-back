import { NextFunction, Response } from "express";
import Board from "../../database/models/Board";
import Note from "../../database/models/Note";
import RequestAuth from "../../types/RequestAuth";
import { badRequest, notFound, unauthorized } from "../../utils/errorFunctions";

export const authorizationForBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const idBoard = req.params.idBoard ?? req.body.idBoard;
    const foundBoard: any = await Board.findById(idBoard);
    if (!foundBoard) {
      const error = notFound("Board not found");
      next(error);
    } else if (`${foundBoard.userId}` === `${req.userId}`) {
      return next();
    } else {
      const error = unauthorized("User not allowed");
      next(error);
    }
  } catch {
    const error = badRequest(
      "Failed Authorization to access board modification"
    );
    next(error);
  }
};

export const authorizationForNote = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const idNote = req.params.idNote ?? req.body.idNote;
    const foundNote: any = await Note.findById(idNote);
    if (!foundNote) {
      const error = notFound("Note not found");
      next(error);
    } else if (`${foundNote.userId}` === `${req.userId}`) {
      return next();
    } else {
      const error = unauthorized("User not allowed");
      next(error);
    }
  } catch {
    const error = badRequest(
      "Failed Authorization to access note modification"
    );
    next(error);
  }
};
