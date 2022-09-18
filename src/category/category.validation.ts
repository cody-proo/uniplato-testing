import joi from "joi";

export const createCategorySchema = joi.object().keys({
  title: joi.string().required().messages({
    "string.base": "you must enter text for title",
    "any.required": "you should enter category title",
  }),
  amount: joi
    .number()
    .optional()
    .messages({ "any.number": "you must enter number for amount" }),
});

export const updateCategorySchema = joi.object().keys({
  title: joi.string().optional().messages({
    "string.base": "you must enter text for title",
  }),
  amount: joi
    .number()
    .optional()
    .messages({ "any.number": "you must enter number for amount" }),
});
