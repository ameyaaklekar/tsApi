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
  password_confirmation: Joi.any().valid(Joi.ref("password")).messages({
    "any.only": `Password does not match`,
  }),
  robot: Joi.string().messages({
    "string.base": `"Google Reptcha: Required`,
    "string.empty": `"Google Reptcha: Required`,
  })
})

export class AuthController {
  
  static register = async (request: Request, response: Response) => {

    let sanitizedInput = await registrationValidator.validateAsync(request.body, {
      abortEarly: false,
      stripUnknown: true
    }).catch(error => {
      ResponseHelper.send422(response, error.details)
      return
    });

    if (sanitizedInput) {

      //Google Recaptcha verification
      let secretKey = process.env.SECRET;
      let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + request.body.robot + "&remoteip=" + request.connection.remoteAddress;

      httpRequest(verificationUrl,function(error,res,body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
          ResponseHelper.send422(response, {}, "Failed captcha verification")
          return
        }
      });

      let companyName = sanitizedInput.company.name;
      let { firstName, lastName, email, password, countryCode, phoneNumber } = sanitizedInput;
  
      let companyRepo = getRepository(Company);
  
      let companyExist = await companyRepo.findOne({
        where: {
          name: companyName
        }
      }).catch(error => {
        ResponseHelper.send500(response, error.details)
        return
      })
  
      if (companyExist) {
        ResponseHelper.send422(response, {}, "Company name already exist.")
        return
      }
  
      let userRepo = getRepository(User);
  
      let userExist = await userRepo.findOne({
        where: {
          email: email
        }
      }).catch(error => {
        ResponseHelper.send500(response, error.details)
        return
      })
  
      if (userExist) {
        ResponseHelper.send422(response, {}, "User already exist.")
        return
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
        ResponseHelper.send200(response, newUser, "User added successfully")
      } catch (error) {
        ResponseHelper.send500(response, error.message, "Something went wrong")
      }
    }
  }
}