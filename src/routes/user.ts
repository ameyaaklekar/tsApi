import { Router } from "express";
import { UserController } from "../controller/User/UserController";


const router = Router();

router.get('/', UserController.getUser);


export default router;