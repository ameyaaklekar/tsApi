import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Product } from "./Product";
import { GeneralUnit } from './GeneralUnit';
import { Stock } from './Stock';

@Entity({ name: "receipe" })
export class Receipe extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "float", precision: 5, scale: 2 })
  quantity: number;

  @ManyToOne(() => Product) 
  product: Product;

  @ManyToOne(() => GeneralUnit)
  unit: GeneralUnit;

  @ManyToOne(() => Stock)
  stock: Stock;
}