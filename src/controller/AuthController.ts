import * as Joi from '@hapi/joi';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../entity/Company';
import { Role } from '../entity/Role';
import { User } from '../entity/User';
import { ResponseHelper } from '../helpers/ResponseHelper';

export const registrationValidator = Joi.object({
  company: {
    name: Joi.string().max(20).required().empty().messages({
      "string.base": `"Company Name" is not valid.`,
      "string.max": `"Company Name" is too long.`,
      "string.required": `"Company Name" is required.`,
      "string.empty": `"Company Name" is required.`,
    })
  },
  firstName: Joi.string().max(20).required().empty(),
  lastName: Joi.string().max(20).required().empty(),
  countryCode: Joi.number().integer().required().empty(),
  phoneNumber: Joi.number().integer().required().empty(),
  email: Joi.string().required().email().empty(),
  password: Joi.string().min(8).required().empty(),
  password_confirmation: Joi.any().valid(Joi.ref("password")).messages({
    "any.only": `"Password" does not match`,
  }),
  robot: Joi.string().empty().messages({
    "string.base": `"Google Reptcha: Required`,
    "string.empty": `"Google Reptcha: Required`,
  })
})

export class AuthController {
  
  static register = async (request: Request, response: Response) => {

    let sanitizedInput = await registrationValidator.validateAsync(request.body).catch(error => {
      ResponseHelper.send422(response, error.details)
      return
    });

    if (sanitizedInput) {
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
        
      await companyRepo.save(company).catch(error => {
        ResponseHelper.send500(response, error.message, "Something went wrong")
        return
      });
  
      let newUser = await userRepo.save(user).catch(error => {
        ResponseHelper.send500(response, error.message, "Something went wrong")
        return
      });
  
      ResponseHelper.send200(response, newUser, "User added successfully")
    }
  }
}