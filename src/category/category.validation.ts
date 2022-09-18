import joi from "joi";

// Validation Schema For Create Category That Contains title - amount That title is Required
export const createCategorySchema = joi.object().keys({
  title: joi.string().required().messages({
    // Customizing Error Messages
    "string.base": "you must enter text for title",
    "any.required": "you should enter category title",
  }),
  amount: joi.number().optional().messages({
    // Customizing Error Messages
    "any.number": "you must enter number for amount",
  }),
});

// Validation Schema For Update Category That Contains Title And Amount That Is Optional
export const updateCategorySchema = joi.object().keys({
  title: joi.string().optional().messages({
    // Customizing Error Messages
    "string.base": "you must enter text for title",
  }),
  amount: joi.number().optional().messages({
    // Customizing Error Messages
    "any.number": "you must enter number for amount",
  }),
});
