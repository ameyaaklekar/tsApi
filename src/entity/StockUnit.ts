import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Company } from "./Company";
import { WeightType } from './WeightType';

@Entity({ name: "stock_unit" })
export class StockUnit extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 20, unique: true })
  unit: string;

  @Column({ length: 20 })
  description: string;

  @Column({ type: "float", precision: 4, scale: 2 })
  ratio: number;

  @ManyToOne(() => WeightType)
  weight: WeightType;

  @ManyToOne(() => Company)
  company: Company;
}