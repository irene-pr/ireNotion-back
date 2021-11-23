import express from "express";
import paths from "../../paths/paths";
import registerUser from "../controllers/userControllers";

const userRoutes = express.Router();

userRoutes.post(paths.registerUser, registerUser);

export default userRoutes;
