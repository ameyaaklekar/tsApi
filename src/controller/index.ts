import { UserController } from "./User/UserController";
import { LoginController } from './Auth/LoginController';
import { RegisterController } from './Auth/RegisterController';
import { LogoutController } from "./Auth/LogoutController";
import { RoleController } from './Role/RoleController';
import { PermissionContoller } from './Permission/PermissionController';
import { EmployeeController } from './Employee/EmployeeController';
import { CompanyController } from './Company/CompanyController';
import { SupplierController } from './Supplier/SupplierController';

const registerController = new RegisterController()
const loginController = new LoginController()
const logoutController = new LogoutController()
const userController = new UserController()
const roleController = new RoleController()
const permissionController = new PermissionContoller()
const employeeController = new EmployeeController()
const companyController = new CompanyController()
const supplierController = new SupplierController()

export {
  registerController,
  loginController,
  userController,
  logoutController,
  roleController,
  permissionController,
  employeeController,
  companyController,
  supplierController
}