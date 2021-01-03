import { Router, Request, Response } from "express";
import { Permissions } from '../middleware/Permissions';
import permissionsConstants from '../constants/permissions';
import { supplierController } from "../controller";

const router = Router();

router.get('/', Permissions(permissionsConstants.VIEW_SUPPLIER), supplierController.all)
  .post('/', Permissions(permissionsConstants.ADD_SUPPLIER), supplierController.create)
  .get('/:id', Permissions(permissionsConstants.UPDATE_SUPPLIER), supplierController.read)
  .put('/', Permissions(permissionsConstants.UPDATE_SUPPLIER), supplierController.update)
  .patch('/', Permissions(permissionsConstants.UPDATE_SUPPLIER), supplierController.changeStatus)

export default router;