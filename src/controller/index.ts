import { UserController } from "./User/UserController";
import { LoginController } from './Auth/LoginController';
import { RegisterController } from './Auth/RegisterController';
import { LogoutController } from "./Auth/LogoutController";
import { RoleController } from './Role/RoleController';
import { PermissionContoller } from './Permission/PermissionController';

const registerController = new RegisterController()
const loginController = new LoginController()
const logoutController = new LogoutController()
const userController = new UserController()
const roleController = new RoleController()
const permissionController = new PermissionContoller()

export {
  registerController,
  loginController,
  userController,
  logoutController,
  roleController,
  permissionController
}