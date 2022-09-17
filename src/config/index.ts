import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const envSchema = joi
  .object({
    PORT: joi.number().min(3000).required(),
    SECRET_KEY: joi.string().required(),
    TOKEN_EXP: joi.string().required()
  })
  .unknown(true)
  .required();

const { error, value } = envSchema.validate(process.env);

if (error?.message) {
  throw new Error(error?.message);
}

export const config = {
  PORT: value.PORT,
  SECRET_KEY: value.SECRET_KEY,
  TOKEN_EXP: value.TOKEN_EXP
};
