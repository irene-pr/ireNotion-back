import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/noteControllers";
import auth from "../middlewares/auth";
import { authorizationForNote } from "../middlewares/authorization";
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
noteRoutes.delete(paths.deleteNote, auth, authorizationForNote, deleteNote);
noteRoutes.put(
  paths.updateNote,
  validate(updateNoteValidation),
  auth,
  authorizationForNote,
  updateNote
);

export default noteRoutes;
