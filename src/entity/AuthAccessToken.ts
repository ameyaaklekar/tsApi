import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from './User';

@Entity()
export class AuthAccessToken {
  @PrimaryColumn({ unique: true })
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: false })
  revoked: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @Column({ type: "datetime" })
  lastLogin: Date;

  @Column({ type: "datetime" })
  expireAt: Date;
}