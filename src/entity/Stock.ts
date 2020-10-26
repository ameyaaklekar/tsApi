import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Supplier } from './Supplier';
import { StockUnit } from './StockUnit';
import { Company } from './Company';

@Entity({ name: "stock" })
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;
  
  @Column({ length: 50 })
  code: string;

  @Column({ type: "float", precision: 5, scale: 2 })
  quantity: number;
  
  @Column({ type: "double", precision: 5, scale: 2 })
  pricePerUnit: number;

  @Column({ type: "double", precision: 5, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => StockUnit)
  stockUnit: StockUnit;

  @ManyToOne(() => Company)
  company: Company;
}