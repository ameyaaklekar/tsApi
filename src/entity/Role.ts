import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from './Permission';
import { User } from "./User";

@Entity({ name: "role" })
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  codeName: string;

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[]

  @ManyToMany(() => User, user => user.roles)
  users: User[];
}