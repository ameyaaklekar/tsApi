import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum Status {
  ACTIVE = "A",
  INACTIVE = "I",
  DELETE = "D"
}
export abstract class BaseEntity {
  @Column({
    type: "enum",
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateAt: string;
}