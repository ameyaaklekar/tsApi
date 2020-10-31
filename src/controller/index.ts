import { UserController } from "./User/UserController";
import { LoginController } from './Auth/LoginController';
import { RegisterController } from './Auth/RegisterController';
import { LogoutController } from "./Auth/LogoutController";

const registerController = new RegisterController()
const loginController = new LoginController()
const logoutController = new LogoutController()
const userController = new UserController()

export {
  registerController,
  loginController,
  userController,
  logoutController
}