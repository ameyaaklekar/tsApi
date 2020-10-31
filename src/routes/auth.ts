import { Router, Request, Response } from "express";
import { LoginController } from "../controller/Auth/LoginController";
import { LogoutController } from "../controller/Auth/LogoutController";
import { AuthController } from '../controller/Auth/RegisterController';
import { Auth } from "../middleware/Auth";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', LoginController.login);
router.post('/logout', Auth, LogoutController.logout);

export default router;