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
      list: Joi.array(),
      order: Joi.number(),
    }).required(),
  }),
};

export const updateNoteValidation = {
  body: Joi.object({
    updatedNote: Joi.object({
      type: Joi.string(),
      order: Joi.number(),
      color: Joi.string(),
      title: Joi.string().empty(""),
      paragraph: Joi.string().empty(""),
      list: Joi.array(),
      file: Joi.string(),
    }),
    idNote: Joi.string().required(),
  }),
};
