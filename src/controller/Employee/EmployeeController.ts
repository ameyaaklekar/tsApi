import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { ResponseHelper } from "../../helpers/ResponseHelper";
import { getCustomRepository } from 'typeorm';
import { User } from "../../entity/User";
import { Role } from '../../entity/Role';
import { Status } from "../../entity/BaseEntity";
import { RolePermissionsHelper } from '../../helpers/RolePermissionsHelper';
import { employeeStatusValidation, employeeValidation } from "../../validations/EmployeeValidation";
import { UserRepository } from '../../repository/UserRepository';
import { RolesRepository } from "../../repository/RolesRepository";
import { PermissionsRepository } from '../../repository/PermissionsRepository';

/**
 * Controller to handle Employee requests
 *
 * @export
 * @class EmployeeController
 * @extends {BaseController}
 */
export class EmployeeController extends BaseController {
  
  /**
   * Gets all the employees of a company
   * 
   * @param request 
   * @param response 
   */
  public all = async (request: Request, response: Response) => {
    let userRepo = getCustomRepository(UserRepository)

    try {
      let user = await userRepo.findOneById(request.body.user.id)
  
      let employees = await userRepo.find({
        where: {
          company: user.company.id
        },
        order: {
          createdAt: "ASC"
        }
      })

      return ResponseHelper.send200(response, employees)
    } catch (error) {
      return ResponseHelper.send500(response, error);
    }
  }

  /**
   * Handles the POST request to create a new employee
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof EmployeeController
   */
  public create = async (request: Request, response: Response) => {

    let sanitizedInput = employeeValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)
 
    let userRepo = getCustomRepository(UserRepository)
    let roleRepo = getCustomRepository(RolesRepository)

    let user: User

    try {
      user = await userRepo.findOneById(request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Invalid User")
    }
    
    let checkIfEmailExist: User[]
    try {
      checkIfEmailExist = await userRepo.checkIfExist(sanitizedInput.value.email, request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Something went wrong")
    }
    
    if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    
    let role: Role
    try {
      role = await roleRepo.findOneByCodeName(sanitizedInput.value.role)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Please select a valid role")
    }
    
    let additionalPermissions = RolePermissionsHelper.sortRoleAndPermissions(role, sanitizedInput.value.permissions);
    
    try {
      let employee = new User();
      employee.firstName = sanitizedInput.value.firstName
      employee.lastName = sanitizedInput.value.lastName
      employee.countryCode = sanitizedInput.value.countryCode
      employee.phoneNumber = sanitizedInput.value.phoneNumber
      employee.email = sanitizedInput.value.email
      employee.password = process.env.NEW_USER_PASSWORD
      employee.hashPassword()
      employee.address = sanitizedInput.value.address
      employee.city = sanitizedInput.value.city
      employee.state = sanitizedInput.value.state
      employee.country = sanitizedInput.value.country
      employee.postalCode = sanitizedInput.value.postalCode
      employee.roles = [role]
      employee.company = user.company
  
      if (additionalPermissions.length > 0) {
        let permissionRepo = getCustomRepository(PermissionsRepository);
        let permissons = await permissionRepo.getPermissionsByCodeName(additionalPermissions)
  
        if (permissons.length > 0) employee.permissions = permissons
      }
  
      let newEmployee = await userRepo.save(employee);

      return ResponseHelper.send200(response, newEmployee, "Employee added successfully")
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
  }

  /**
   * Handles a GET request to get one employee
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof EmployeeController
   */
  public read = async (request: Request, response: Response) => {
    let userRepo = getCustomRepository(UserRepository)
    try {
      const employee = await userRepo.findOneById(request.params.id)
      await employee.getPermissions()
      return ResponseHelper.send200(response, employee)
    } catch (error) {
      return ResponseHelper.send403(response, error)
    }
  }

  /**
   * Handles UPDATE request to update the employee details/Role/Permission
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof EmployeeController
   */
  public update = async (request: Request, response: Response) => {
    let sanitizedInput = employeeValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    });

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    let userRepo = getCustomRepository(UserRepository)
    let roleRepo = getCustomRepository(RolesRepository)
    
    let checkIfEmailExist : User[]
    try {
      checkIfEmailExist = await userRepo.checkIfExist(sanitizedInput.value.email, request.body.employeeId)
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }

    if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    
    let role: Role
    try {
      role = await roleRepo.findOneByCodeName(sanitizedInput.value.role)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Please select a valid role")
    }

    let employeePermissions = RolePermissionsHelper.sortRoleAndPermissions(role, sanitizedInput.value.permissions)

    try {
      let employee = await userRepo.findOneById(request.body.employeeId)
  
      await userRepo.createQueryBuilder()
        .relation(User, "roles")
        .of(employee)
        .remove(employee.roles)
  
      await userRepo.createQueryBuilder()
        .relation(User, "permissions")
        .of(employee)
        .remove(employee.permissions)
  
      employee.firstName = sanitizedInput.value.firstName
      employee.lastName = sanitizedInput.value.lastName
      employee.countryCode = sanitizedInput.value.countryCode
      employee.phoneNumber = sanitizedInput.value.phoneNumber
      employee.email = sanitizedInput.value.email
      employee.address = sanitizedInput.value.address
      employee.city = sanitizedInput.value.city
      employee.state = sanitizedInput.value.state
      employee.country = sanitizedInput.value.country
      employee.postalCode = sanitizedInput.value.postalCode
      employee.roles = [role]
      employee.setPermissions(employeePermissions)
  
      let updatedUser = await userRepo.save(employee)
      return ResponseHelper.send200(response, updatedUser, "Employee Updated Successfully")
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
  }

  public delete = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  /**
   * Handles PUT request to update the stattus of the employee
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof EmployeeController
   */
  public changeStatus = async (request: Request, response: Response) => {
    let sanitizedInput = employeeStatusValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    let userRepo = getCustomRepository(UserRepository)
    let user: User
    try {
      user = await userRepo.findOneById(request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Invalid User")
    }

    try {
      let employee = await userRepo.findOne({
        where: {
          id: sanitizedInput.value.employeeId,
          company: user.company
        }
      })

      employee.status = (sanitizedInput.value.status === 'A') ? Status.ACTIVE : Status.INACTIVE
      let updatedUser = await userRepo.save(employee)
      return ResponseHelper.send200(response, updatedUser, 'Employee status changed successfully')
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Employee was not found")
    }
  }
}