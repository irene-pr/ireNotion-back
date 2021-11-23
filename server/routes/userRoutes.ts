import express from "express";
import paths from "../../paths/paths";

const userRoutes = express.Router();

userRoutes.post(paths.loginUser, () => {});

export default userRoutes;
