import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import { loginUser, registerUser } from "../controllers/userControllers";
import registerValidation from "../schemas/userSchemas";

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
  validate(registerValidation, {
    context: true,
    statusCode: 400,
    keyByField: true,
  }),
  loginUser
);

export default userRoutes;
