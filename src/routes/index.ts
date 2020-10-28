import { Router, Request, Response } from "express";
import auth from "./auth";

const routes = Router();

routes.use("/", auth);

export default routes;