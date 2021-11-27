import { Joi } from "express-validation";

export const createNoteValidation = {
  body: Joi.object({
    note: Joi.object({
      type: Joi.string().required(),
    }),
    idBoard: Joi.string().required(),
  }),
};

export const updateNoteValidation = {
  body: Joi.object({
    updatedNote: Joi.object({
      type: Joi.string().required(),
    }),
    idNote: Joi.string().required(),
  }),
};
