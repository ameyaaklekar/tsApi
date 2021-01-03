import Joi = require("@hapi/joi")

/**
 * Employee validation params
 */
const supplierValidation = Joi.object({
  name: Joi.string().max(20).required().empty().messages({
    "string.base": `Name is not valid.`,
    "string.max": `Name is too long.`,
    "string.required": `Name is required.`,
    "string.empty": `Name is required.`,
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
  })
})

/**
 * Employee status valdiation params
 */
const supplierStatusValidation = Joi.object({
  "supplierId": Joi.string().required(),
  "status": Joi.string().required(),
})

export {
  supplierValidation,
  supplierStatusValidation
}