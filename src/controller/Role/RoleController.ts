import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { ResponseHelper } from "../../helpers/ResponseHelper";
import { getRepository, Not } from 'typeorm';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';

export class RoleController extends BaseController {

  public all = async (request: Request, response: Response) => {

    let userRepo = getRepository(User)
    try {
      let user = await userRepo.findOneOrFail({
        where: {
          id: request.body.user.id
        },
        relations: ['company', 'roles', 'permissions']
      })
      await user.getPermissions();

      let isSuperAdmin = user.roles.filter((role) => {
        return role.codeName === 'superAdmin'
      })

      let roleRepo = getRepository(Role);
      let roles: Role[]
      if (isSuperAdmin.length > 0) {
        roles = await roleRepo.find()
      } else {
        roles = await roleRepo.find({
          where: {
            codeName: Not("superAdmin")
          }
        })
      }
      return ResponseHelper.send200(response, roles)
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
  }

  public create = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public read = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public update = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public delete = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public permission = async (request: Request, response: Response) => {
    let roleRepo = getRepository(Role);
    try {
      let rolePermissions = await roleRepo.findOne({
        where: {
          codeName: request.params.role
        },
        relations: ['permissions']
      })

      return ResponseHelper.send200(response, rolePermissions.permissions)
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
    
  }

}