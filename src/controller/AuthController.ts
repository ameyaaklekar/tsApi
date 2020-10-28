import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

export class AuthController {
  
  static register = async (request: Request, response: Response) => {

    let companyName = request.body.company.name;
    let { firstName, lastName, email, password, countryCode, phoneNumber } = request.body;

    let companyRepo = getRepository(Company);
    let company = new Company();

    let userRepo = getRepository(User);
    let user = new User();

    company.name = companyName;
    company.displayName = companyName;

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.countryCode = countryCode;
    user.phoneNumber = phoneNumber;
    user.company = company;
      
    try {
      await companyRepo.save(company);
      let newUser = await userRepo.save(user);
  
      response.status(200).send({
        success: true,
        data: newUser,
        message: "User added successfully"
      })
    } catch (error) {
      response.status(500).send({
        success: false,
        errors: error.message,
        message: "Something went wrong"
      })
    }
  }
}