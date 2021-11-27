import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import {
  getUserContent,
  loginUser,
  registerUser,
} from "../controllers/userControllers";
import auth from "../middlewares/auth";
import { registerValidation, loginValidation } from "../schemas/userSchemas";

const userRoutes = express.Router();

userRoutes.post(
  paths.registerUser,
  validate(registerValidation, {
    context: true,
    statusCode: 400,
    keyByField: true,
  }),
  registerUser
);

userRoutes.post(
  paths.loginUser,
  validate(loginValidation, {
    context: true,
    statusCode: 400,
    keyByField: true,
  }),
  loginUser
);

userRoutes.get(paths.getUserContent, auth, getUserContent);

export default userRoutes;
