
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { ResponseHelper } from '../helpers/ResponseHelper';
import { getRepository } from 'typeorm';
import { AuthAccessToken } from '../entity/AuthAccessToken';

/**
 * Middleware to Authenticate the User Access Token
 * 
 * @param request 
 * @param response 
 * @param next 
 */
export const Auth = async (request: Request, response: Response, next: NextFunction) => {
  let authHeader = request.headers.authorization;
  let token = authHeader && authHeader.split(' ')[1]

  if (token == null) return ResponseHelper.send401(response)

  jwt.verify(token, process.env.ACCESS_TOKEN, async (error, user) => {
    if (error) return ResponseHelper.send403(response)
    
    let authTokenRepo = getRepository(AuthAccessToken);

    let authToken = await authTokenRepo.createQueryBuilder('auth_access_token')
      .innerJoinAndSelect('auth_access_token.user', 'user')
      .where('token = :token', { token })
      .where('user.status = :status', { status: "A" })
      .getOne()

    if (!authToken) return ResponseHelper.send403(response)
    request.body.user = user;
    next();
  })
}