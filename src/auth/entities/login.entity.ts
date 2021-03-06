import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { LoginInfo } from './login_info.entity';
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
  fail_count: number;

  @Column({
    default: 0,
  })
  success_count: number;

  @Column({
    default: false,
  })
  locked: boolean;

  @OneToOne((type) => Account, (account) => account.login)
  account: Account;

  @OneToMany((type) => LoginInfo, (logininfo) => logininfo.login)
  login_info: LoginInfo[];

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
