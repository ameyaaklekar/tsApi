import {getManager, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Role } from '../entity/Role';
import { Permission } from '../entity/Permission';
import { User } from "../entity/User";

export class linkUsersRoleAndPermissions1603681186357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       let roleRepo = getRepository(Role);
       let superAdmin = await roleRepo.findOne({
           where: {
               codeName: "superAdmin"
           },
           relations: ['permissions']
       });

       let permissionRepo = getRepository(Permission);
       let permissions = await permissionRepo.find();

       for (let i =0; i < permissions.length; i ++) {
            superAdmin.permissions.push(permissions[i]);
       }
       await roleRepo.save(superAdmin);

       let userRepo = getRepository(User);
       let user = await userRepo.findOne({
           where: {
               email: "ameyaaklekar@gmail.com"
           },
           relations: ["roles"]
       })

       user.roles.push(superAdmin);
       userRepo.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
