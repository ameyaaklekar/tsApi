import { Router, Request, Response } from "express";
import { Auth } from "../middleware/Auth";
import authRoute from "./auth";
import userRoute from "./user";
import roleRoute from "./role";
import permissionRoute from "./permission";

const routes = Router();

routes.use("/", authRoute);
routes.use("/user", Auth, userRoute);
routes.use("/role", Auth, roleRoute);
routes.use("/permission", Auth, permissionRoute);

export default routes;