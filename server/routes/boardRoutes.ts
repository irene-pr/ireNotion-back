import express from "express";
import paths from "../../paths/paths";
import { createBoard, deleteBoard } from "../controllers/boardControllers";

const boardRoutes = express.Router();

boardRoutes.post(paths.createBoard, createBoard);

boardRoutes.delete(paths.deleteBoard, deleteBoard);

export default boardRoutes;
