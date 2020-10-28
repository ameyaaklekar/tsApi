import { Router, Request, Response } from "express";
import { AuthController } from '../controller/AuthController';

const router = Router();

router.post('/register', AuthController.register);

export default router;