
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';
import { ResponseHelper } from '../../helpers/ResponseHelper';

export class UserController {

  static getUser = async (request: Request, response: Response) => {
    let userRepo = getRepository(User)
    let roleRepo = getRepository(Role)
    try {
      let user = await userRepo.findOneOrFail({
        where: {
          id: request.body.user.id
        },
        relations: ['company', 'roles', 'permissions']
      })

      let role = await roleRepo.findOneOrFail({
        where: {
          id: user.roles[0].id
        },
        relations: ["permissions"]
      })

      user.permissions = [...user.permissions, ...role.permissions]
      return ResponseHelper.send200(response, user)      
    } catch (error) {
      return ResponseHelper.send403(response, error)
    }
  }
}