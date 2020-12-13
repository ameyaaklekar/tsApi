
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { UserRepository } from '../../repository/UserRepository';
import { userValidation } from '../../validations/UserValidation';
import { BaseController } from '../BaseController';

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
    let userRepo = getCustomRepository(UserRepository)
    try {
      let user = await userRepo.findOneById(request.body.user.id)
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
    let sanitizedInput = userValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    const userRepo = getCustomRepository(UserRepository)
    const user = await userRepo.findOneById(request.body.user.id)

    if (user.email !== sanitizedInput.value.email) {
      let checkIfEmailExist = await userRepo.checkIfExist(sanitizedInput.value.email, sanitizedInput.value.user.id)
      if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    }

    user.firstName = sanitizedInput.value.firstName
    user.lastName = sanitizedInput.value.lastName
    user.countryCode = sanitizedInput.value.countryCode
    user.phoneNumber = sanitizedInput.value.phoneNumber
    user.email = sanitizedInput.value.email
    user.address = sanitizedInput.value.address
    user.city = sanitizedInput.value.city
    user.state = sanitizedInput.value.state
    user.country = sanitizedInput.value.country
    user.postalCode = sanitizedInput.value.postalCode
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