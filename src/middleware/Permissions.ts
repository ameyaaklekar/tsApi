import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import { ResponseHelper } from '../helpers/ResponseHelper';

/**
 * Middleware to Authenticate the user permissions to perform an action
 * 
 * @param permission 
 */
export const Permissions = (permission: String) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    let userRepo = getRepository(User);
    let roleRepo = getRepository(Role)
  
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
  
    if (user && user.permissions.length > 0) {
      var hasPermisisons = user.permissions.filter(function(el) {
        return el.codeName == permission
      })
  
      if (hasPermisisons.length == 0) return ResponseHelper.send403(response, {}, "Unauthorized Action")
     
      next()
    }
  }
}