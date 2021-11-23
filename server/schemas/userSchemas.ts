import { Joi } from "express-validation";

const registerValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{7,20}/)
      .required(),
  }),
};

export default registerValidation;
