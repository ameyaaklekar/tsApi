import { User } from '../entity/User';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Not } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private userRepo: Repository<User>

  constructor() {
    super()
    this.userRepo = getRepository(User)
  }

  public getAll = async () => {

  }

  public findOneById = async (userId: string) => {
    try {
      const user = await this.userRepo.findOneOrFail({
        where: {
          id: userId
        },
        relations: ['company', 'roles', 'permissions']
      })

      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  public findByEmail = async (email: string) => {
    try {
      const users = await this.userRepo.find({
        where: {
          email: email
        },
        relations: ['company', 'roles', 'permissions']
      })

      return users
    } catch (error) {
      throw new Error(error);
    }
  }

  public checkIfExist = async (email: string, userId: string) => {
    try {
      const users = await this.userRepo.find({
        where: {
          email: email,
          id: Not(userId)
        },
        relations: ['company', 'roles', 'permissions']
      })

      return users
    } catch (error) {
      throw new Error(error);
    }
  }
}