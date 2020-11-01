import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import { User } from '../../entity/User';
import * as jwt from "jsonwebtoken";
import { AuthAccessToken } from '../../entity/AuthAccessToken';

const loginValidator = Joi.object({
  email: Joi.string().required().email().empty().messages({
    "string.base": `Email is not valid.`,
    "string.max": `Email is too long.`,
    "string.required": `Email is required.`,
    "string.empty": `Email is required.`,
  }),
  password: Joi.string().required().empty().messages({
    "string.base": `Password is not valid.`,
    "string.required": `Password is required.`,
    "string.empty": `Password is required.`,
  })
})

/**
 * Controller to handle the login requests
 *
 * @export
 * @class LoginController
 */
export class LoginController {

  /**
   * Function to handle the login
   * Returns Access Token
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof LoginController
   */
  public login = async (request: Request, response: Response) => {
    let sanitizedInput = await loginValidator.validateAsync(request.body, {
      abortEarly: false
    }).catch(error => {
      return ResponseHelper.send401(response, error.details)
    });

    if (sanitizedInput) {

      let { email, password } = sanitizedInput;
      let userRepo = getRepository(User);
      let user: User
      try {
        user = await userRepo.findOneOrFail({
          where: {
            email: email,
            status: 'A'
          }
        })
      } catch (error) {
        return ResponseHelper.send401(response, error, "User does not exist")
      }

      if (!user.checkIfPasswordIsValid(password)) {
        return ResponseHelper.send401(response, {}, "Invalid email or password")
      }

      let token = jwt.sign(
        {
          id: user.id
        },
        process.env.ACCESS_TOKEN,
        { 
          algorithm: "HS256",
          expiresIn:  process.env.TOKEN_LIFE 
        }
      )
      
      let decodedToken = jwt.decode(token);

      let tokenRepo = getRepository(AuthAccessToken)
      let accessToken = new AuthAccessToken()
      accessToken.id = token
      accessToken.user = user
      accessToken.expireAt = new Date(decodedToken["exp"] * 1000)
      accessToken.lastLogin = new Date()
      tokenRepo.save(accessToken)

      return ResponseHelper.send200(response, token)
    }
  }
}