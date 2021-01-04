import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Company } from './Company';

@Entity({ name: "stock_category" })
export class StockCategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;
  
  @Column({ length: 50 })
  code: string;

  @ManyToOne(() => Company)
  company: Company;
}