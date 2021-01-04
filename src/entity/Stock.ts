import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Supplier } from './Supplier';
import { StockUnit } from './StockUnit';
import { Company } from './Company';
import { StockProduct } from './StockProduct';

@Entity({ name: "stock" })
export class Stock extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => StockProduct)
  @JoinColumn()
  stockProduct: StockProduct

  @Column({ type: "float", precision: 5, scale: 2 })
  quantity: number;

  @Column({ type: "double", precision: 5, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Company)
  company: Company;
}