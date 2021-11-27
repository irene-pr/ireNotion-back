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
      position: Joi.object({
        x: Joi.number(),
        y: Joi.number(),
        h: Joi.number(),
        w: Joi.number(),
      }),
      color: Joi.string(),
      title: Joi.string(),
      paragraph: Joi.string(),
      list: Joi.array(),
      file: Joi.string(),
    }),
    idNote: Joi.string().required(),
  }),
};
