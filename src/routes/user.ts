import { Router } from "express";
import permissionsConstants from "../constants/permissions";
import { Permissions } from "../middleware/Permissions";
import { userController } from "../controller"

const router = Router();

router.get('/', userController.read);
router.put('/', Permissions(permissionsConstants.UPDATE_PROFILE), userController.update);

export default router;