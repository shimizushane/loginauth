import {
  Entity,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Login } from './login.entity';

@Entity()
export class LoginInfo {
  // 預想，pc登入踢pc，phone登入踢phone
  // MongoDB
  // @ObjectIdColumn()
  // id: ObjectID;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_agent: string;

  @Column()
  ip: string;

  @Column({
    default: 1,
  })
  count: number;

  @ManyToOne((type) => Login, (login) => login.login_info)
  @JoinColumn({ name: 'login_id' })
  login: Login;

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
