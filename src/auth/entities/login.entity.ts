import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Token } from './token.entity';
import { Account } from 'src/account/entities/account.entity';

@Entity()
export class Login {
  // MongoDB
  // @ObjectIdColumn()
  // id: ObjectID;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: 0,
  })
  phone_count: number;

  @Column({
    default: 0,
  })
  pc_count: number;

  @Column({
    default: false,
  })
  locked: boolean;

  @OneToOne(() => Account, (account) => account.login)
  account: Account;

  @OneToMany(() => Token, (token) => token.token)
  tokens: string;

  @CreateDateColumn({
    type: 'timestamp',
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at: Date;
}
