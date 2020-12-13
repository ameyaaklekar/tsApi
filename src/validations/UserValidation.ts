import Joi = require("@hapi/joi");

export const userValidation = Joi.object({
  firstName: Joi.string().max(20).required().empty().messages({
    "string.base": `Firstname is not valid.`,
    "string.max": `Firstname is too long.`,
    "string.required": `Firstname is required.`,
    "string.empty": `Firstname is required.`,
  }),
  lastName: Joi.string().max(20).required().empty().messages({
    "string.base": `Lastname is not valid.`,
    "string.max": `Lastname is too long.`,
    "string.required": `Lastname is required.`,
    "string.empty": `Lastname is required.`,
  }),
  countryCode: Joi.number().integer().required().empty().messages({
    "number.base": `Country code is not valid.`,
    "number.required": `Country code is required.`,
    "number.empty": `Country code is required.`,
  }),
  phoneNumber: Joi.number().integer().required().empty().messages({
    "number.base": `Phone number is not valid.`,
    "number.required": `Phone number is required.`,
    "number.empty": `Phone number is required.`,
  }),
  email: Joi.string().required().email().empty().messages({
    "string.base": `Email is not valid.`,
    "string.required": `Email is required.`,
    "string.empty": `Email is required.`,
  }),
  address: Joi.string().required().empty().messages({
    "string.base": `Address is not valid.`,
    "string.required": `Address is required.`,
    "string.empty": `Address is required.`,
  }),
  city: Joi.string().required().empty().messages({
    "string.base": `City is not valid.`,
    "string.required": `City is required.`,
    "string.empty": `City is required.`,
  }),
  state: Joi.string().required().empty().messages({
    "string.base": `State is not valid.`,
    "string.required": `State is required.`,
    "string.empty": `State is required.`,
  }),
  country: Joi.string().required().empty().messages({
    "string.base": `Country is not valid.`,
    "string.required": `Country is required.`,
    "string.empty": `Country is required.`,
  }),
  postalCode: Joi.string().required().empty().messages({
    "string.base": `Postal code is not valid.`,
    "string.required": `Postal code is required.`,
    "string.empty": `Postal code is required.`,
  }),
})