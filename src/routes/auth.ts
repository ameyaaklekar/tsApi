import { Router, Request, Response } from "express";
import { Auth } from "../middleware/Auth";
import { registerController, loginController, logoutController } from "../controller"

const router = Router();

router.post('/register', registerController.register)
  .post('/login', loginController.login)
  .post('/logout', Auth, logoutController.logout)

export default router;