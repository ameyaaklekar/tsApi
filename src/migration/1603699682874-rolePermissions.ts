import {getRepository, In, MigrationInterface, QueryRunner} from "typeorm";
import { Role } from '../entity/Role';
import { Permission } from '../entity/Permission';

export class rolePermissions1603699682874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        let roleRepo = getRepository(Role);
        let adminRole = await roleRepo.findOne({
            where: {
                codeName: "admin"
            },
            relations: ["permissions"]
        });

        let managerRole = await roleRepo.findOne({
            where: {
                codeName: "manager"
            },
            relations: ["permissions"]
        });

        let supervisorRole = await roleRepo.findOne({
            where: {
                codeName: "supervisor"
            },
            relations: ["permissions"]
        });

        let employeeRole = await roleRepo.findOne({
            where: {
                codeName: "employee"
            },
            relations: ["permissions"]
        });

        let adminPermissionsArr = [
            'addEmployee',
            'updateEmployee',
            'deleteEmployee',
            'viewEmployee',
            'addBranch',
            'updateBranch',
            'deleteBranch',
            'viewBranch',
            'givePermissions',
            'removePermissions',
            'viewPermissions',
            'addRoles',
            'updateRoles',
            'deleteRoles',
            'viewRoles',
            'viewCompany',
            'updateCompany',
            'deleteCompany',
            'updateProfile',
            'addStock',
            'viewStock',
            'updateStock',
            'deleteStock',
            'addSupplier',
            'viewSupplier',
            'updateSupplier',
            'deleteSupplier',
        ];

        let permissionRepo = getRepository(Permission);

        let adminPermissions = await permissionRepo.find({
            where: {
                codeName: In(adminPermissionsArr)
            }
        });

        for (let i = 0; i < adminPermissions.length; i++) {
            adminRole.permissions.push(adminPermissions[i]);
        }

       await roleRepo.save(adminRole);

       let managerPermissionsArr = [
            'addEmployee',
            'updateEmployee',
            'deleteEmployee',
            'viewEmployee',
            'viewBranch',
            'givePermissions',
            'removePermissions',
            'viewPermissions',
            'viewRoles',
            'viewCompany',
            'updateProfile',
            'viewStock',
            'viewSupplier',
        ];

        let managerPermission = await permissionRepo.find({
            where: {
                codeName: In(managerPermissionsArr)
            }
        });

        for (let i = 0; i < managerPermission.length; i++) {
            managerRole.permissions.push(managerPermission[i]);
        }

       await roleRepo.save(managerRole);

       let supervisorPermissionArr = [
            'viewEmployee',
            'givePermissions',
            'removePermissions',
            'viewPermissions',
            'viewRoles',
            'viewCompany',
            'updateProfile'
        ];

        let supervisorPermission = await permissionRepo.find({
            where: {
                codeName: In(supervisorPermissionArr)
            }
        });

        for (let i = 0; i < supervisorPermission.length; i++) {
            supervisorRole.permissions.push(supervisorPermission[i]);
        }
        await roleRepo.save(supervisorRole);

        let employeePermissionArr = [
            'viewCompany'
        ];

        let employeePermission = await permissionRepo.find({
            where: {
                codeName: In(employeePermissionArr)
            }
        });

        for (let i = 0; i < employeePermission.length; i++) {
            employeeRole.permissions.push(employeePermission[i]);
        }

        await roleRepo.save(employeeRole);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
