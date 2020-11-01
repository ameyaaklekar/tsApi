import { Router, Request, Response } from "express";
import { permissionController } from "../controller";

const router = Router();

router.get('/', permissionController.all);

export default router;