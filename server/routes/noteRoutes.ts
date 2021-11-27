import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/noteControllers";
import auth from "../middlewares/auth";
import {
  authorizationForNoteDeletion,
  authorizationForNoteUpdate,
} from "../middlewares/authorization";
import {
  createNoteValidation,
  updateNoteValidation,
} from "../schemas/noteSchemas";

const noteRoutes = express.Router();

noteRoutes.post(
  paths.createNote,
  validate(createNoteValidation),
  auth,
  createNote
);
noteRoutes.delete(
  paths.deleteNote,
  auth,
  authorizationForNoteDeletion,
  deleteNote
);
noteRoutes.put(
  paths.updateNote,
  validate(updateNoteValidation),
  auth,
  authorizationForNoteUpdate,
  updateNote
);

export default noteRoutes;
