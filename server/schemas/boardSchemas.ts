import { Joi } from "express-validation";

const createBoardValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

export default createBoardValidation;
