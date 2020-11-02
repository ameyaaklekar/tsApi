import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { ResponseHelper } from "../../helpers/ResponseHelper";
import Joi = require("@hapi/joi");
import { getRepository, In, Not } from 'typeorm';
import { User } from "../../entity/User";
import { Role } from '../../entity/Role';
import { Permission } from '../../entity/Permission';

export const employeeValidation = Joi.object({
  firstName: Joi.string().max(20).required().empty().messages({
    "string.base": `Firstname is not valid.`,
    "string.max": `Firstname is too long.`,
    "string.required": `Firstname is required.`,
    "string.empty": `Firstname is required.`,
  }),
  lastName: Joi.string().max(20).required().empty().messages({
    "string.base": `Lastname is not valid.`,
    "string.max": `Lastname is too long.`,
    "string.required": `Lastname is required.`,
    "string.empty": `Lastname is required.`,
  }),
  countryCode: Joi.number().integer().required().empty().messages({
    "number.base": `Country code is not valid.`,
    "number.required": `Country code is required.`,
    "number.empty": `Country code is required.`,
  }),
  phoneNumber: Joi.number().integer().required().empty().messages({
    "number.base": `Phone number is not valid.`,
    "number.required": `Phone number is required.`,
    "number.empty": `Phone number is required.`,
  }),
  email: Joi.string().required().email().empty().messages({
    "string.base": `Email is not valid.`,
    "string.required": `Email is required.`,
    "string.empty": `Email is required.`,
  }),
  address: Joi.string().allow(null, '').messages({
    "string.base": `Address is not valid.`,
  }),
  city: Joi.string().allow(null, '').messages({
    "string.base": `City is not valid.`,
  }),
  state: Joi.string().allow(null, '').messages({
    "string.base": `State is not valid.`,
  }),
  country: Joi.string().allow(null, '').messages({
    "string.base": `Country is not valid.`,
  }),
  postalCode: Joi.string().allow(null, '').messages({
    "string.base": `Postal code is not valid.`,
  }),
  role: Joi.string().required().empty().messages({
    "string.base": `Role is not valid.`,
    "string.required": `Role is required.`,
    "string.empty": `Role is required.`,
  }),
  permissions: Joi.array().required().empty()
})

export class EmployeeController extends BaseController {
  public all = async (request: Request, response: Response) => {
    let userRepo = getRepository(User)

    try {
      let user = await userRepo.findOneOrFail({
        where: {
          id: request.body.user.id
        },
        relations: ['company'],
      })
  
      let employees = await userRepo.find({
        where: {
          company: user.company.id
        },
        order: {
          createdAt: "ASC"
        }
      })

      ResponseHelper.send200(response, employees)
    } catch (error) {
      return ResponseHelper.send500(response, error);
    }
  }

  public create = async (request: Request, response: Response) => {

    let sanitizedInput = await employeeValidation.validateAsync(request.body, {
      abortEarly: false,
      allowUnknown: true
    }).catch(error => {
      ResponseHelper.send422(response, error.details, "Invalid details provided")
      return
    });

    let userRepo = getRepository(User)
    let roleRepo = getRepository(Role)

    let user = await userRepo.findOneOrFail({
      where: {
        id: request.body.user.id
      },
      relations: ['company']
    })

    let checkIfEmailExist = await userRepo.find({
      where: {
        email: sanitizedInput.email
      }
    })

    if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    
    let role: Role
    try {
      role = await roleRepo.findOneOrFail({
        where: {
          codeName: sanitizedInput.role
        },
        relations: ['permissions']
      })
    } catch (error) {
      ResponseHelper.send422(response, error.details, "Please select a valid role")
      return
    }
    

    let rolePermissions = role.permissions

    let additionalPermissions = [];
    sanitizedInput.permissions.forEach((permission: Array<String>) => additionalPermissions.push(permission));

    rolePermissions.forEach(permission => {
      let index = additionalPermissions.indexOf(permission.codeName);
      additionalPermissions.splice(index, 1);
    })

    try {
      let employee = new User();
      employee.firstName = sanitizedInput.firstName
      employee.lastName = sanitizedInput.lastName
      employee.countryCode = sanitizedInput.countryCode
      employee.phoneNumber = sanitizedInput.phoneNumber
      employee.email = sanitizedInput.email
      employee.password = process.env.NEW_USER_PASSWORD
      employee.hashPassword()
      employee.address = sanitizedInput.address
      employee.city = sanitizedInput.city
      employee.state = sanitizedInput.state
      employee.country = sanitizedInput.country
      employee.postalCode = sanitizedInput.postalCode
      employee.roles = [role]
      employee.company = user.company
  
      if (additionalPermissions.length > 0) {
        let permissionRepo = getRepository(Permission);
        let permissons = await permissionRepo.find({
          where: {
            codeName: In(additionalPermissions)
          }
        })
  
        if (permissons.length > 0) employee.permissions = permissons
      }
  
      let newEmployee = await userRepo.save(employee);

      return ResponseHelper.send200(response, newEmployee, "Employee added successfully")
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
  }

  public read = async (request: Request, response: Response) => {
    let userRepo = getRepository(User)
    try {
      let user = await userRepo.findOneOrFail({
        where: {
          id: request.body.user.id
        },
        relations: ['company']
      })

      let employee = await userRepo.findOne({
        where: {
          id: request.params.id
        },
        relations: ['company', 'roles', 'permissions']
      })
      await employee.getPermissions()

      return ResponseHelper.send200(response, employee)
      
    } catch (error) {
      return ResponseHelper.send403(response, error)
    }
  }

  public update = async (request: Request, response: Response) => {
    let sanitizedInput = await employeeValidation.validateAsync(request.body, {
      abortEarly: false,
      allowUnknown: true
    }).catch(error => {
      return ResponseHelper.send422(response, error.details, "Invalid details provided")
    });

    let userRepo = getRepository(User)
    let roleRepo = getRepository(Role)
    
    let checkIfEmailExist:User[]
    try {
       checkIfEmailExist = await userRepo.find({
        where: {
          email: sanitizedInput.email,
          id: Not(request.body.employeeId)
        }
      })
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }

    if (checkIfEmailExist.length > 0) return ResponseHelper.send422(response, {}, "Email already exist")
    
    let role: Role
    try {
      role = await roleRepo.findOneOrFail({
        where: {
          codeName: sanitizedInput.role
        },
        relations: ['permissions']
      })
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Please select a valid role")
    }
    

    let rolePermissions = role.permissions

    let additionalPermissions = [];
    sanitizedInput.permissions.forEach((permission: Array<String>) => 
      additionalPermissions.push(permission)
    );

    rolePermissions.forEach(permission => {
      let index = additionalPermissions.indexOf(permission.codeName);
      additionalPermissions.splice(index, 1);
    })
    
    try {
      let employee = await userRepo.findOne({
        where: {
          id: request.body.employeeId
        },
        relations: ['roles', 'permissions']
      })
  
      await userRepo.createQueryBuilder()
        .relation(User, "roles")
        .of(employee)
        .remove(employee.roles)
  
      await userRepo.createQueryBuilder()
        .relation(User, "permissions")
        .of(employee)
        .remove(employee.permissions)
  
      employee.firstName = sanitizedInput.firstName
      employee.lastName = sanitizedInput.lastName
      employee.countryCode = sanitizedInput.countryCode
      employee.phoneNumber = sanitizedInput.phoneNumber
      employee.email = sanitizedInput.email
      employee.address = sanitizedInput.address
      employee.city = sanitizedInput.city
      employee.state = sanitizedInput.state
      employee.country = sanitizedInput.country
      employee.postalCode = sanitizedInput.postalCode
      employee.roles = [role]
  
      if (additionalPermissions.length > 0) {
        let permissionRepo = getRepository(Permission);
        let permissons = await permissionRepo.find({
          where: {
            codeName: In(additionalPermissions)
          }
        })
  
        if (permissons.length > 0) employee.permissions = permissons
      } else {
        employee.permissions = []
      }
  
      let updatedUser = userRepo.save(employee)
      return ResponseHelper.send200(response, updatedUser)
    } catch (error) {
      return ResponseHelper.send500(response, error)
    }
  }

  public delete = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }
}