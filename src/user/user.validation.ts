import { UserRole } from "@prisma/client";
import joi from "joi";

// Validation Schema For Signup That Contains Email - Password - Bio - Role
export const signupSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    "string.base": "you must enter string for email",
    "any.required": "you must enter email address",
    "string.email": "you must enter valid email address",
  }),
  password: joi.string().min(8).required().messages({
    "string.base": "you must enter string for password",
    "any.required": "you must enter password",
    "string.min": "your password must contain atleast 8 character",
  }),
  bio: joi.string().optional().messages({
    "string.base": "you must enter string for bio",
  }),
  role: joi
    .string()
    .valid(...Object.values(UserRole))
    .optional()
    .messages({
      "string.base": "you must enter string for role",
      "any.valid": `user role must be ${Object.values(UserRole)}`,
    }),
});

// Validation Schema For Login That Contains Email - Password
export const loginSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    "string.base": "you must enter string for email",
    "any.required": "you must enter email address",
    "string.email": "you must enter valid email address",
  }),
  password: joi.string().min(8).required().messages({
    "string.base": "you must enter string for password",
    "any.required": "you must enter password",
    "string.min": "your password must contain atleast 8 character",
  }),
});
