import { Router, Request, Response } from "express";
import { Permissions } from '../middleware/Permissions';
import permissionsConstants from '../constants/permissions';
import { employeeController } from "../controller";

const router = Router();

router.get('/', Permissions(permissionsConstants.VIEW_EMPLOYEE), employeeController.all)
  .post('/', Permissions(permissionsConstants.ADD_EMPLOYEE), employeeController.create)
  .get('/:id', Permissions(permissionsConstants.UPDATE_EMPLOYEE), employeeController.read)
  .put('/', Permissions(permissionsConstants.UPDATE_EMPLOYEE), employeeController.update)
  .patch('/', Permissions(permissionsConstants.UPDATE_EMPLOYEE), employeeController.changeStatus)

export default router;