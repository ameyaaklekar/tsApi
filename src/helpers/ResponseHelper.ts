import { Response } from 'express';

/**
 * Class to manage the response
 *
 * @export
 * @class ResponseHelper
 */
export class ResponseHelper {

  /**
   * Common static function to send the response
   *
   * @static
   * @param {Response} response
   * @param {number} [code=200]
   * @param {{}} body
   * @memberof ResponseHelper
   */
  static send = (response: Response, code: number = 200 , body: {}) => {
    response.status(code).send(body);
  }

  /**
   * Function to create the body of the response
   *
   * @static
   * @param {boolean} success
   * @param {*} [data={}]
   * @param {string} [message=""]
   * @memberof ResponseHelper
   */
  static getBody = (success: boolean, data: any = {}, message: string = "") => {
    if (success) {
      return {
        success: success,
        data: data,
        message: message
      }
    } else {
      return {
        success: success,
        errors: (data.length) ? data : { message: message },
        message: message
      }
    }
  }

  /**
   * Success Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Success"]
   * @memberof ResponseHelper
   */
  static send200 = (response: Response, data: any = {}, message: string = "Success") => {
    ResponseHelper.send(response, 200, ResponseHelper.getBody(true, data, message))
  }

  /**
   * Created Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Created"]
   * @memberof ResponseHelper
   */
  static send201 = (response: Response, data: any = {}, message: string = "Created") => {
    ResponseHelper.send(response, 201, ResponseHelper.getBody(true, data, message))

  }

  /**
   * No Content Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="No Content"]
   * @memberof ResponseHelper
   */
  static send204 = (response: Response, data: any = {}, message: string = "No Content") => {
    ResponseHelper.send(response, 204, ResponseHelper.getBody(true, data, message))
  }

  /**
   * Unauthorised Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Unauthorised"]
   * @memberof ResponseHelper
   */
  static send401 = (response: Response, data: any = {}, message: string = "Unauthorised") => {
    ResponseHelper.send(response, 401, ResponseHelper.getBody(false, data, message))

  }

  /**
   * Forbidden Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Forbidden"]
   * @memberof ResponseHelper
   */
  static send403 = (response: Response, data: any = {}, message: string = "Forbidden") => {
    ResponseHelper.send(response, 403, ResponseHelper.getBody(false, data, message))
  }

  /**
   * Not Found Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Not Found"]
   * @memberof ResponseHelper
   */
  static send404 = (response: Response, data: any = {}, message: string = "Not Found") => {
    ResponseHelper.send(response, 404, ResponseHelper.getBody(false, data, message))
  }

  /**
   * No Acceptable Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Not Acceptable"]
   * @memberof ResponseHelper
   */
  static send406 = (response: Response, data: any = {}, message: string = "Not Acceptable") => {
    ResponseHelper.send(response, 406, ResponseHelper.getBody(false, data, message))
  }

  /**
   * Unprocessable Entity Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Unprocessable Entity"]
   * @memberof ResponseHelper
   */
  static send422 = (response: Response, data: any = {}, message: string = "Unprocessable Entity") => {
    ResponseHelper.send(response, 422, ResponseHelper.getBody(false, data, message))
  }

  /**
   * Internal Server Error Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Internal Server Error"]
   * @memberof ResponseHelper
   */
  static send500 = (response: Response, data: any = {}, message: string = "Internal Server Error") => {
    ResponseHelper.send(response, 500, ResponseHelper.getBody(false, data, message))
  }

  /**
   * Service Unavailable Response
   *
   * @static
   * @param {Response} response
   * @param {*} [data={}]
   * @param {string} [message="Service Unavailable"]
   * @memberof ResponseHelper
   */
  static send503 = (response: Response, data: any = {}, message: string = "Service Unavailable") => {
    ResponseHelper.send(response, 503, ResponseHelper.getBody(false, data, message))
  }
}