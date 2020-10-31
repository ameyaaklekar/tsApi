import { Request, Response } from 'express';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { getRepository } from 'typeorm';
import { AuthAccessToken } from '../../entity/AuthAccessToken';
import { User } from '../../entity/User';

/**
 * Controller to handle logout request
 *
 * @export
 * @class LogoutController
 */
export class LogoutController {

  /**
   * Function to handle the logout 
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof LogoutController
   */
  public logout = async (request: Request, response: Response) => {

    let authTokenRepo = getRepository(AuthAccessToken);
    authTokenRepo.delete({ user: request.body.user.id })
    return ResponseHelper.send204(response, {}, "Successfully signed out")
  }
}