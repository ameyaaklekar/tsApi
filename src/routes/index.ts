import { Router, Request, Response } from "express";
import { Auth } from "../middleware/Auth";
import authRoute from "./auth";
import userRoute from "./user";

const routes = Router();

routes.use("/", authRoute);
routes.use("/user", Auth, userRoute);

export default routes;