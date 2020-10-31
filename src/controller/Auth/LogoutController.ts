import { Request, Response } from 'express';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { getRepository } from 'typeorm';
import { AuthAccessToken } from '../../entity/AuthAccessToken';
import { User } from '../../entity/User';


export class LogoutController {
  static logout = async (request: Request, response: Response) => {

    let authTokenRepo = getRepository(AuthAccessToken);
    authTokenRepo.delete({ user: request.body.user.id })
    ResponseHelper.send204(response, {}, "Successfully signed out")

  }
}