import Joi = require("@hapi/joi")

/**
 * Employee validation params
 */
const employeeValidation = Joi.object({
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
  address: Joi.string().allow(null, '').messages({
    "string.base": `Address is not valid.`,
  }),
  city: Joi.string().allow(null, '').messages({
    "string.base": `City is not valid.`,
  }),
  state: Joi.string().allow(null, '').messages({
    "string.base": `State is not valid.`,
  }),
  country: Joi.string().allow(null, '').messages({
    "string.base": `Country is not valid.`,
  }),
  postalCode: Joi.string().allow(null, '').messages({
    "string.base": `Postal code is not valid.`,
  }),
  role: Joi.string().required().empty().messages({
    "string.base": `Role is not valid.`,
    "string.required": `Role is required.`,
    "string.empty": `Role is required.`,
  }),
  permissions: Joi.array().required().empty()
})

/**
 * Employee status valdiation params
 */
const employeeStatusValidation = Joi.object({
  "companyId": Joi.string().required(),
  "employeeId": Joi.string().required(),
  "status": Joi.string().required(),
})

export {
  employeeValidation,
  employeeStatusValidation
}