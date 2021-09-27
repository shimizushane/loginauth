import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInter } from './interfaces/user.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(user: UserInter): Promise<any> {
    const result = this.userRepository.create(user);
    return result;
  }

  async findAll(): Promise<any> {
    return { result: [{ _id: 1 }, { _id: 2 }] };
  }
}
