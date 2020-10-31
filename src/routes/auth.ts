import { Router, Request, Response } from "express";
import { AuthController } from '../controller/Auth/RegisterController';

const router = Router();

router.post('/register', AuthController.register);

export default router;