import { Router, Request, Response } from "express";
import { Auth } from "../middleware/Auth";
import authRoute from "./auth";
import userRoute from "./user";
import roleRoute from "./role";
import permissionRoute from "./permission";
import employeeRoute from "./employee";
import companyRoute from "./company";

const routes = Router();

routes.use("/", authRoute);
routes.use("/user", Auth, userRoute);
routes.use("/role", Auth, roleRoute);
routes.use("/permission", Auth, permissionRoute);
routes.use("/employee", Auth, employeeRoute);
routes.use("/company", Auth, companyRoute);

export default routes;