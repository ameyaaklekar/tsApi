import { BaseController } from "../BaseController";
import { Request, Response } from 'express';
import { ResponseHelper } from "../../helpers/ResponseHelper";
import { getCustomRepository } from 'typeorm';
import { SupplierRepository } from '../../repository/SupplierRepository';
import { UserRepository } from '../../repository/UserRepository';
import { supplierStatusValidation, supplierValidation } from "../../validations/SupplierValidation";
import { Supplier } from '../../entity/Supplier';
import { User } from '../../entity/User';
import { Status } from "../../entity/BaseEntity";

/**
 * Controller to handle Employee requests
 *
 * @export
 * @class EmployeeController
 * @extends {BaseController}
 */
export class SupplierController extends BaseController {
  
  /**
   * Gets all the employees of a company
   * 
   * @param request 
   * @param response 
   */
  public all = async (request: Request, response: Response) => {
    const supplierRepo = getCustomRepository(SupplierRepository)
    const userRepo = getCustomRepository(UserRepository)

    try {
      const user = await userRepo.findOneById(request.body.user.id)

      const suppliers = await supplierRepo.find({
        where: {
          company: user.company.id
        }
      })

      return ResponseHelper.send200(response, suppliers);

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

    const supplierRepo = getCustomRepository(SupplierRepository)
    const userRepo = getCustomRepository(UserRepository)
    let user : User
    try {
      user = await userRepo.findOneById(request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Invalid User")
    }

    let sanitizedInput = supplierValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    let checkIfSupplierExist: Supplier[]
    try {
      checkIfSupplierExist = await supplierRepo.checkIfExist(sanitizedInput.value.name, user.company.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Something went wrong")
    }

    if (checkIfSupplierExist.length > 0) return ResponseHelper.send422(response, {}, "Supplier already exist")

    try {
      const supplier = new Supplier();
      supplier.name = sanitizedInput.value.name
      supplier.countryCode = sanitizedInput.value.countryCode
      supplier.phoneNumber = sanitizedInput.value.phoneNumber
      supplier.email = sanitizedInput.value.email
      supplier.contactPerson = sanitizedInput.value.contactPerson
      supplier.address = sanitizedInput.value.address
      supplier.city = sanitizedInput.value.city
      supplier.state = sanitizedInput.value.state
      supplier.country = sanitizedInput.value.country
      supplier.postalCode = sanitizedInput.value.postalCode
      supplier.company = user.company

      const newSupplier = await supplierRepo.save(supplier)

      return ResponseHelper.send200(response, newSupplier, 'Supplier added successfully')
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
    let supplierRepo = getCustomRepository(SupplierRepository)
    try {
      const supplier = await supplierRepo.findOneById(request.params.id)
      return ResponseHelper.send200(response, supplier)
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
    const supplierRepo = getCustomRepository(SupplierRepository)
    const userRepo = getCustomRepository(UserRepository)
    let user : User
    try {
      user = await userRepo.findOneById(request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Invalid User")
    }

    let sanitizedInput = supplierValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    try {
      let supplier = await supplierRepo.findOneById(request.body.supplierId)

      supplier.countryCode = sanitizedInput.value.countryCode
      supplier.phoneNumber = sanitizedInput.value.phoneNumber
      supplier.email = sanitizedInput.value.email
      supplier.contactPerson = sanitizedInput.value.contactPerson
      supplier.address = sanitizedInput.value.address
      supplier.city = sanitizedInput.value.city
      supplier.state = sanitizedInput.value.state
      supplier.country = sanitizedInput.value.country
      supplier.postalCode = sanitizedInput.value.postalCode

      const updatedSupplier = await supplierRepo.save(supplier)

      return ResponseHelper.send200(response, updatedSupplier, 'Supplier Updated successfully')
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
    const supplierRepo = getCustomRepository(SupplierRepository)
    const userRepo = getCustomRepository(UserRepository)
    let user : User
    try {
      user = await userRepo.findOneById(request.body.user.id)
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Invalid User")
    }

    let sanitizedInput = supplierStatusValidation.validate(request.body, {
      abortEarly: false,
      allowUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)

    try {
      let supplier = await supplierRepo.findOne({
        where: {
          id: sanitizedInput.value.supplierId,
          company: user.company
        }
      })

      supplier.status = (sanitizedInput.value.status === 'A') ? Status.ACTIVE : Status.INACTIVE
      let updatedSupplier = await supplierRepo.save(supplier)
      return ResponseHelper.send200(response, updatedSupplier, 'Supplier status changed successfully')
    } catch (error) {
      return ResponseHelper.send422(response, error.details, "Supplier was not found")
    }
  }
}