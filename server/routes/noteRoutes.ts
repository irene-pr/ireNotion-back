import express from "express";
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

const noteRoutes = express.Router();

noteRoutes.post(paths.createNote, auth, createNote);
noteRoutes.delete(
  paths.deleteNote,
  auth,
  authorizationForNoteDeletion,
  deleteNote
);
noteRoutes.put(paths.updateNote, auth, authorizationForNoteUpdate, updateNote);

export default noteRoutes;
