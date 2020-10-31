
import { Request, Response } from 'express';

/**
 * Abstract base class for consistancy
 *
 * @export
 * @abstract
 * @class BaseController
 */
export abstract class BaseController {
  /**
   * Abstract function to get all the records
   *
   * @abstract
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<Object>}
   * @memberof BaseController
   */
  public abstract async all(req: Request, res: Response): Promise<Object>;

  /**
   * Abstract funtion to create a new record
   *
   * @abstract
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<Object>}
   * @memberof BaseController
   */
  public abstract async create(req: Request, res: Response): Promise<Object>;

  /**
   * Abstract function to read one record
   *
   * @abstract
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<Object>}
   * @memberof BaseController
   */
  public abstract async read(req: Request, res: Response): Promise<Object>;

  /**
   * Abstract function to update a record
   *
   * @abstract
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<Object>}
   * @memberof BaseController
   */
  public abstract async update(req: Request, res: Response): Promise<Object>;

  /**
   * Abstract function to delete a record
   *
   * @abstract
   * @param {Request} req
   * @param {Response} res
   * @return {*}  {Promise<Object>}
   * @memberof BaseController
   */
  public abstract async delete(req: Request, res: Response): Promise<Object>;
}