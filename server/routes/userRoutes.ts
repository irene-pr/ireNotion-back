import express from "express";
import { validate } from "express-validation";
import paths from "../../paths/paths";
import registerUser from "../controllers/userControllers";
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

export default userRoutes;
