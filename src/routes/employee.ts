import { Router, Request, Response } from "express";
import { Auth } from "../middleware/Auth";
import { Permissions } from '../middleware/Permissions';
import permissionsConstants from '../constants/permissions';
import { employeeController } from "../controller";

const router = Router();

router.get('/', Permissions(permissionsConstants.VIEW_EMPLOYEE), employeeController.all)
router.post('/', Permissions(permissionsConstants.ADD_EMPLOYEE), employeeController.create)
router.get('/:id', Permissions(permissionsConstants.UPDATE_EMPLOYEE), employeeController.read)

export default router;