import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Company } from './Company';

@Entity({ name: "supplier" })
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  email: string;

  @Column({
    type: "int",
  })
  countryCode: number;
  
  @Column({
    type: "int",
  })
  phoneNumber: number;

  @Column({ 
    nullable: true,
    length: 100
  })
  address: string;

  @Column({ 
    nullable: true,
    length: 100
  })
  state: string;

  @Column({ 
    nullable: true,
    length: 100
  })
  city: string;

  @Column({ 
    nullable: true,
    length: 100
  })
  country: string;

  @Column({ 
    nullable: true,
    length: 10
  })
  postalCode: string;

  @Column({ length: 20 })
  contactPerson: string;

  @ManyToOne(() => Company)
  company: Company
}