import express from "express";
import paths from "../../paths/paths";
import {
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/noteControllers";
import auth from "../middlewares/auth";

const noteRoutes = express.Router();

noteRoutes.post(paths.createNote, auth, createNote);
noteRoutes.delete(paths.deleteNote, auth, deleteNote);
noteRoutes.put(paths.updateNote, auth, updateNote);

export default noteRoutes;
