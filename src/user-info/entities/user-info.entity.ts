import { Account } from 'src/account/entities/account.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class UserInfo {
  // MongoDB
  // @ObjectIdColumn()
  // id: ObjectID;

  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  district: string;

  @Column({
    nullable: true,
  })
  address: string;

  @OneToOne(() => Account, (account) => account.userInfo)
  @JoinColumn()
  account: Account;

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
