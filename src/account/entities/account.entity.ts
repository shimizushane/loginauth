import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AccountRole } from './account.interface';
import { Login } from 'src/auth/entities/login.entity';
import { UserInfo } from 'src/user-info/entities/user-info.entity';

@Entity()
export class Account {
  // MongoDB
  // @ObjectIdColumn()
  // id: ObjectID;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: '',
  })
  username: string;

  @Column({
    type: 'enum',
    enum: AccountRole,
    default: AccountRole.GHOST,
  })
  role: AccountRole;

  @Column({
    nullable: true,
  })
  mobile_phone: string;

  @Column({
    default: false,
  })
  validate_email: boolean;

  @Column({
    default: false,
  })
  validate_mobile_phone: boolean;

  @OneToOne(() => Login, (login) => login.account)
  @JoinColumn()
  login: Login;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.account)
  @JoinColumn()
  userInfo: UserInfo;

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
