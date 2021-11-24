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

  @Column({
    length: 50,
  })
  email: string;

  @Column({
    length: 20,
  })
  password: string;

  @Column({
    length: 20,
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
    length: 20,
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
  validate_phone: boolean;

  @OneToOne(() => Login, (login) => login.account, { cascade: true })
  @JoinColumn({ name: 'login_id' })
  login: Login;

  @OneToOne(() => UserInfo, (userInfo) => userInfo.account, { cascade: true })
  @JoinColumn({ name: 'user_info_id' })
  user_info: UserInfo;

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
