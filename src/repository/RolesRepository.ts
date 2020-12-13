import { Role } from '../entity/Role';
import { EntityRepository, getRepository, Repository } from 'typeorm';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {

  private roleRepo: Repository<Role>

  constructor() {
    super()
    this.roleRepo = getRepository(Role)
  }

  public findOneByCodeName = async (codeName: string) => {
    try {
      const role = await this.roleRepo.findOneOrFail({
        where: {
          codeName: codeName
        },
        relations: ['permissions']
      })

      return role
    } catch (error) {
      throw new Error(error);
    }
  }

}