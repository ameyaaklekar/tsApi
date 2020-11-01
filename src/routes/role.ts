import { Router, Request, Response } from "express";
import { roleController } from "../controller";

const router = Router();

router.get('/', roleController.all);
router.get('/permission/:role', roleController.permission);

export default router;