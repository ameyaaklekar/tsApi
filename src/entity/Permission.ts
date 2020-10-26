import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "permission" })
export class Permission {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  codeName: string
}