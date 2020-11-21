import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../../entity/Company';
import { Role } from '../../entity/Role';
import { User } from '../../entity/User';
import { ResponseHelper } from '../../helpers/ResponseHelper';
import * as httpRequest from 'request';

export const registrationValidator = Joi.object({
  company: {
    name: Joi.string().max(20).required().empty().messages({
      "string.base": `Company Name is not valid.`,
      "string.max": `Company Name is too long.`,
      "string.required": `Company Name is required.`,
      "string.empty": `Company Name is required.`,
    })
  },
  firstName: Joi.string().max(20).required().empty().messages({
    "string.base": `Firstname is not valid.`,
    "string.max": `Firstname is too long.`,
    "string.required": `Firstname is required.`,
    "string.empty": `Firstname is required.`,
  }),
  lastName: Joi.string().max(20).required().empty().messages({
    "string.base": `Lastname is not valid.`,
    "string.max": `Lastname is too long.`,
    "string.required": `Lastname is required.`,
    "string.empty": `Lastname is required.`,
  }),
  countryCode: Joi.number().integer().required().empty().messages({
    "number.base": `Country code is not valid.`,
    "number.required": `Country code is required.`,
    "number.empty": `Country code is required.`,
  }),
  phoneNumber: Joi.number().integer().required().empty().messages({
    "number.base": `Phone number is not valid.`,
    "number.required": `Phone number is required.`,
    "number.empty": `Phone number is required.`,
  }),
  email: Joi.string().required().email().empty().messages({
    "string.base": `Email is not valid.`,
    "string.max": `Email is too long.`,
    "string.required": `Email is required.`,
    "string.empty": `Email is required.`,
  }),
  password: Joi.string().min(8).required().empty().messages({
    "string.base": `Password is not valid.`,
    "string.min": `Minimum 8 words Password is required.`,
    "string.required": `Password is required.`,
    "string.empty": `Password is required.`,
  }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).messages({
    "any.only": `Password does not match`,
  }),
  robot: Joi.string().messages({
    "string.base": `"Google Reptcha: Required`,
    "string.empty": `"Google Reptcha: Required`,
  })
})

/**
 * Controller to handle register request
 *
 * @export
 * @class RegisterController
 */
export class RegisterController {
  
  /**
   * Function to register a new user
   *
   * @param {Request} request
   * @param {Response} response
   * @memberof RegisterController
   */
  public register = async (request: Request, response: Response) => {

    let sanitizedInput = registrationValidator.validate(request.body, {
      abortEarly: false,
      stripUnknown: true
    })

    if (sanitizedInput.error) return ResponseHelper.send422(response, sanitizedInput.error.details, "Invalid input provided", true)


    //Google Recaptcha verification
    let secretKey = process.env.RECAPTCHA_SECRET;
    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + request.body.robot + "&remoteip=" + request.connection.remoteAddress;

    httpRequest(verificationUrl,function(error,res,body) {
      body = JSON.parse(body);
      // Success will be true or false depending upon captcha validation.
      if (body.success !== undefined && !body.success) {
        return ResponseHelper.send422(response, {}, "Failed captcha verification")
      }
    });

    let companyName = sanitizedInput.value.company.name;
    let { firstName, lastName, email, password, countryCode, phoneNumber } = sanitizedInput.value;

    let companyRepo = getRepository(Company);

    let companyExist = await companyRepo.findOne({
      where: {
        name: companyName
      }
    }).catch(error => {
      return ResponseHelper.send500(response, error.details)
    })

    if (companyExist) {
      return ResponseHelper.send422(response, {}, "Company name already exist.")
    }

    let userRepo = getRepository(User);

    let userExist = await userRepo.findOne({
      where: {
        email: email
      }
    }).catch(error => {
      return ResponseHelper.send500(response, error.details)
    })

    if (userExist) {
      return ResponseHelper.send422(response, {}, "User already exist.")
    }

    let roleRepo = getRepository(Role);
    let admin = await roleRepo.findOne({
        where: {
            codeName: "admin"
        }
    });

    let company = new Company();
    let user = new User();

    company.name = companyName;
    company.displayName = companyName;

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.hashPassword();
    user.countryCode = countryCode;
    user.phoneNumber = phoneNumber;
    user.company = company;
    user.roles = [admin];
    
    try {
      await companyRepo.save(company);
      let newUser = await userRepo.save(user);
      return ResponseHelper.send200(response, newUser, "User added successfully")
    } catch (error) {
      return ResponseHelper.send500(response, error.message, "Something went wrong")
    }
  }
}