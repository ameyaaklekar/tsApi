import {getConnection, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Company } from "../entity/Company";
import { Permission } from '../entity/Permission';
import { Role } from '../entity/Role';
import { User } from "../entity/User";

export class createPermissions1603678396525 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    let roles = [
      {
        codeName: 'superAdmin',
        name: 'Super Admin',
      },
      {
        codeName: 'admin',
        name: 'Admin',
      },
      {
        codeName: 'manager',
        name: 'Manager',
      },
      {
        codeName: 'supervisor',
        name: 'Supervisor',
      },
      {
        codeName: 'employee',
        name: 'Employee',
      }
    ]

    for (let i = 0; i < roles.length; i ++) {
      let roleRepository = getRepository(Role);
      let roleEntity = new Role();
      roleEntity.name = roles[i].name;
      roleEntity.codeName = roles[i].codeName;

      await roleRepository.save(roleEntity);
    }


    let permissions = [
      {
        name: 'addEmployee',
        display_name: 'Add Employee',
      },
      {
        name: 'updateEmployee',
        display_name: 'Update Employee',
      },
      {
        name: 'deleteEmployee',
        display_name: 'Delete Employee',
      },
      {
        name: 'viewEmployee',
        display_name: 'View Employee',
      },
      {
        name: 'addBranch',
        display_name: 'Add Branch',
      },
      {
        name: 'updateBranch',
        display_name: 'Update Branch',
      },
      {
        name: 'deleteBranch',
        display_name: 'Delete Branch',
      },
      {
        name: 'viewBranch',
        display_name: 'View Branch',
      },
      {
        name: 'givePermissions',
        display_name: 'Give Permissions',
      },
      {
        name: 'removePermissions',
        display_name: 'Delete Permissions',
      },
      {
        name: 'viewPermissions',
        display_name: 'View Permissions',
      },
      {
        name: 'addRoles',
        display_name: 'Add Roles',
      },
      {
        name: 'updateRoles',
        display_name: 'Update Roles',
      },
      {
        name: 'deleteRoles',
        display_name: 'Delete Roles',
      },
      {
        name: 'viewRoles',
        display_name: 'View Roles',
      },
      {
        name: 'viewCompany',
        display_name: 'View Company',
      },
      {
        name: 'updateCompany',
        display_name: 'Edit Company',
      },
      {
        name: 'deleteCompany',
        display_name: 'Delete Company',
      },
      {
        name: 'updateProfile',
        display_name: 'Update Profile',
      },
      {
        name: 'addStock',
        display_name: 'Add Stock',
      },
      {
        name: 'viewStock',
        display_name: 'View Stock',
      },
      {
        name: 'updateStock',
        display_name: 'Edit Stock',
      },
      {
        name: 'deleteStock',
        display_name: 'Delete Stock',
      },
      {
        name: 'addSupplier',
        display_name: 'Add Supplier',
      },
      {
        name: 'viewSupplier',
        display_name: 'View Supplier',
      },
      {
        name: 'updateSupplier',
        display_name: 'Edit Supplier',
      },
      {
        name: 'deleteSupplier',
        display_name: 'Delete Supplier',
      },
    ];

    for (let i = 0; i < permissions.length; i++) {
      let permissionsRepository = getRepository(Permission);
      let entity = new Permission();
      entity.name = permissions[i].display_name;
      entity.codeName = permissions[i].name;

      await permissionsRepository.save(entity);
    }

    let companyRepo = getRepository(Company);
    let company = new Company();
    company.name = "Cultural Switch";
    company.displayName = "Cultural Switch";
    await companyRepo.save(company);

    let userRepository = getRepository(User);
    let user = new User();
    user.firstName = "Ameya";
    user.lastName = "Aklekar";
    user.email = "ameyaaklekar@gmail.com";
    user.password = "Ameya1993";
    user.countryCode = 64;
    user.phoneNumber = 224116255;
    user.company = company;
    await userRepository.save(user);

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
