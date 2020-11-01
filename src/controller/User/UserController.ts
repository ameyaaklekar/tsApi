
import Joi = require('@hapi/joi');
import { Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { BaseController } from '../BaseController';

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
    "string.max": `Email is too long.`,
    "string.required": `Email is required.`,
    "string.empty": `Email is required.`,
  }),
  address: Joi.string().required().empty().messages({
    "string.base": `Address is not valid.`,
    "string.max": `Address is too long.`,
    "string.required": `Address is required.`,
    "string.empty": `Address is required.`,
  }),
  city: Joi.string().required().empty().messages({
    "string.base": `City is not valid.`,
    "string.max": `City is too long.`,
    "string.required": `City is required.`,
    "string.empty": `City is required.`,
  }),
  state: Joi.string().required().empty().messages({
    "string.base": `State is not valid.`,
    "string.max": `State is too long.`,
    "string.required": `State is required.`,
    "string.empty": `State is required.`,
  }),
  country: Joi.string().required().empty().messages({
    "string.base": `Country is not valid.`,
    "string.max": `Country is too long.`,
    "string.required": `Country is required.`,
    "string.empty": `Country is required.`,
  }),
  postalCode: Joi.string().required().empty().messages({
    "string.base": `Postal code is not valid.`,
    "string.max": `Postal code is too long.`,
    "string.required": `Postal code is required.`,
    "string.empty": `Postal code is required.`,
  }),
})

/**
 * User Controller to handle the user requests
 *
 * @export
 * @class UserController
 * @extends {BaseController}
 */
export class UserController extends BaseController {

  /**
   * Function to get all the users
   * Probably will be used for the Admin Side
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof UserController
   */
  public all = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  /**
   * Function to create a new user
   * Probably will be used for the Admin side
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof UserController
   */
  public create = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  /**
   * Function to read the user
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof UserController
   */
  public read = async (request: Request, response: Response) => {
    let userRepo = getRepository(User)
    try {
      let user = await userRepo.findOneOrFail({
        where: {
          id: request.body.user.id
        },
        relations: ['company', 'roles', 'permissions']
      })

      await user.getPermissions();

      return ResponseHelper.send200(response, user)
      
    } catch (error) {
      return ResponseHelper.send403(response, error)
    }
  }

  /**
   * Function to update the user
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof UserController
   */
  public update = async (request: Request, response: Response) => {

    let sanitizedInput = await userValidation.validateAsync(request.body, {
      abortEarly: false,
      allowUnknown: true
    }).catch(error => {
      ResponseHelper.send422(response, error.details)
      return
    });

    let userRepo = getRepository(User)
    let user = await userRepo.findOneOrFail({
      where: {
        id: request.body.user.id
      },
      relations: ['company', 'roles', 'permissions']
    })

    if (user.email !== sanitizedInput.email) {
      let checkIfEmailExist = await userRepo.findAndCount({
        where: {
          email: sanitizedInput.email,
          id: Not(sanitizedInput.user.id)
        }
      })
      
      if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    }

    user.firstName = sanitizedInput.firstName
    user.lastName = sanitizedInput.lastName
    user.countryCode = sanitizedInput.countryCode
    user.phoneNumber = sanitizedInput.phoneNumber
    user.email = sanitizedInput.email
    user.address = sanitizedInput.address
    user.city = sanitizedInput.city
    user.state = sanitizedInput.state
    user.country = sanitizedInput.country
    user.postalCode = sanitizedInput.postalCode
    user.getPermissions();
    await userRepo.save(user);
    
    return ResponseHelper.send200(response, user);
  }

  /**
   * Function to delete the user
   * In our case change the status of the user to D
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof UserController
   */
  public delete = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }
}