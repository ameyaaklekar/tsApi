import { Router } from "express";
import permissionsConstants from "../constants/permissions";
import { UserController } from "../controller/User/UserController";
import { Permissions } from "../middleware/Permissions";


const router = Router();

router.get('/', UserController.getUser);
router.put('/', Permissions(permissionsConstants.UPDATE_PROFILE), UserController.updateUser);


export default router;