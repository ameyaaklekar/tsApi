import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { User } from "./User";

@Entity({ name: "company" })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true
  })
  name: string;

  @Column({
    nullable: true
  })
  displayName: string;

  @Column({
    nullable: true
  })
  description: string;

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

  @OneToMany(() => User, users => users.company)
  users: User[]
}