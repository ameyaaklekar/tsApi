import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { ResponseHelper } from "../../helpers/ResponseHelper";
import { getRepository, Not } from 'typeorm';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';
import { Permission } from '../../entity/Permission';
import { In } from 'typeorm';

export class PermissionContoller extends BaseController {

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

      let permissionRepo = getRepository(Permission)
      let permissions: Permission[]
      if (isSuperAdmin.length > 0) {
        permissions = await permissionRepo.find()
      } else {
        permissions = await permissionRepo.find({
          where: {
            codeName: Not(In(["addRoles", "updateRoles", "deleteRoles"]))
          }
        })
      }
      return ResponseHelper.send200(response, permissions)
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

}