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
export class Token {
  // 預想，pc登入踢pc，phone登入踢phone
  // MongoDB
  // @ObjectIdColumn()
  // id: ObjectID;

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Login, (login) => login.tokens)
  @JoinColumn({ name: 'login_id' })
  token: string;

  @Column()
  user_agent: string;

  @Column()
  ip: string;

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
