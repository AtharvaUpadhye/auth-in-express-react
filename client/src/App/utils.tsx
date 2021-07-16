import Joi from "joi";
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://app-7896.herokuapp.com";

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/(^[a-zA-Z0-9_]+$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().trim().min(10).required(),
});

export { BASE_URL, schema }