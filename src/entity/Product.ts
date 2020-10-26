import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Company } from './Company';

@Entity({ name: "product" })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20 })
  name: string;

  @Column({ type: "double", precision: 5, scale: 2 })
  sellingPrice: number;

  @ManyToOne(() => Company)
  company: Company;
}