
import { Repository, getRepository, In } from 'typeorm';
import { Permission } from '../entity/Permission';

export class PermissionsRepository extends Repository<Permission> {

  private permissionsRepo : Repository<Permission>

  constructor() {
    super()
    this.permissionsRepo = getRepository(Permission)
  }

  public getPermissionsByCodeName = async (codeNames: Array<[]>) => {
    try {
      const permissons = await this.permissionsRepo.find({
        where: {
          codeName: In(codeNames)
        }
      })
      return permissons
    } catch (error) {
      throw new Error(error);
    }
  }
}