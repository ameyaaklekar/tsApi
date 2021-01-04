import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Company } from './Company';
import { Supplier } from './Supplier';
import { StockUnit } from './StockUnit';
import { StockCategory } from './StockCategory';

@Entity({ name: "stock_product" })
export class StockProduct extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;
  
  @Column({ length: 50 })
  code: string;

  @Column({ type: "double", precision: 5, scale: 2 })
  pricePerUnit: number;

  @ManyToOne(() => Supplier)
  supplier: Supplier;

  @ManyToOne(() => StockUnit)
  stockUnit: StockUnit;

  @ManyToOne(() => StockCategory)
  stockCategory: StockCategory;

  @ManyToOne(() => Company)
  company: Company;
}