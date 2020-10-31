import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Company } from "./Company";
import { Role } from './Role';
import { Permission } from './Permission';
import { BaseEntity } from "./BaseEntity";
import * as bcrypt from "bcryptjs";

@Entity({ name: "user" })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: "datetime", nullable: true })
  emailVarifiedAt: string;

  @Column()
  password: string;

  @Column({ type: "int" })
  countryCode: number;
  
  @Column({ type: "int" })
  phoneNumber: number;

  @Column({ nullable: true, length: 100 })
  address: string;

  @Column({ nullable: true, length: 100 })
  state: string;

  @Column({ nullable: true, length: 100 })
  city: string;

  @Column({ nullable: true, length: 100 })
  country: string;

  @Column({ nullable: true, length: 10 })
  postalCode: string;
  
  @Column({ type: "datetime", nullable: true })
  passwordChangedAt: string;

  @ManyToOne(() => Company, company => company.users)
  company: Company

  @ManyToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  hashPassword() {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkIfPasswordIsValid(rawPassword: string) {
    return bcrypt.compareSync(rawPassword, this.password);
  }
}
