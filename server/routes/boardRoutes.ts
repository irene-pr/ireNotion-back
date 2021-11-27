import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import { createBoard, deleteBoard } from "../controllers/boardControllers";
import auth from "../middlewares/auth";
import { authorizationForBoardDeletion } from "../middlewares/authorization";
import createBoardValidation from "../schemas/boardSchemas";

const boardRoutes = express.Router();

boardRoutes.post(
  paths.createBoard,
  validate(createBoardValidation),
  auth,
  createBoard
);

boardRoutes.delete(
  paths.deleteBoard,
  auth,
  authorizationForBoardDeletion,
  deleteBoard
);

export default boardRoutes;
