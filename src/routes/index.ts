import { Router, Request, Response } from "express";

const routes = Router();
routes.use("/", (request: Request, response: Response) => {
  response.send({
    success: "this is the route"
  })
})
export default routes;