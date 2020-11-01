import { ResponseHelper } from "../../helpers/ResponseHelper";
import { BaseController } from "../BaseController";
import { Request, Response } from 'express';

export class CompanyController extends BaseController {
  public all = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public create = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public read = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public update = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }

  public delete = async (request: Request, response: Response) => {
    return ResponseHelper.send404(response);
  }
}