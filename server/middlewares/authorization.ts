import { NextFunction, Response } from "express";
import Note from "../../database/models/Note";
import { RequestAuth } from "../../utils/mocks/mockFunctionsForTests";
import newError from "../../utils/newError";

const authorizationForNoteDeletion = async (
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
    }
    if (`${foundNote.userId}` === req.userId) {
      return next();
    }

    const error: {
      message: string;
      code?: number;
    } = new Error("User not allowed");
    error.code = 401;
    next(error);
  } catch (error) {
    error.message = "Cannot search the activity";
    error.code = 400;
    next(error);
  }
};

export default authorizationForNoteDeletion;
