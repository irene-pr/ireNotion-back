import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import {
  createBoard,
  deleteBoard,
  updateBoard,
} from "../controllers/boardControllers";
import auth from "../middlewares/auth";
import { authorizationForBoard } from "../middlewares/authorization";
import createBoardValidation from "../schemas/boardSchemas";

const boardRoutes = express.Router();

boardRoutes.post(
  paths.createBoard,
  validate(createBoardValidation),
  auth,
  createBoard
);

boardRoutes.delete(paths.deleteBoard, auth, authorizationForBoard, deleteBoard);

boardRoutes.put(paths.updateBoard, auth, authorizationForBoard, updateBoard);

export default boardRoutes;
