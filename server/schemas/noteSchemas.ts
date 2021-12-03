import { Joi } from "express-validation";

export const createNoteValidation = {
  body: Joi.object({
    idBoard: Joi.string().required(),
    note: Joi.object({
      type: Joi.string().required(),
      file: Joi.string(),
      color: Joi.string(),
      title: Joi.string(),
      paragraph: Joi.string(),
      list: Joi.string(),
      order: Joi.string(),
    }).required(),
  }),
};

export const updateNoteValidation = {
  body: Joi.object({
    updatedNote: Joi.object({
      type: Joi.string().required(),
      order: Joi.number(),
      color: Joi.string(),
      title: Joi.string(),
      paragraph: Joi.string(),
      list: Joi.array(),
      file: Joi.string(),
    }),
    idNote: Joi.string().required(),
  }),
};
