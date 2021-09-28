import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const count = await this.userRepository.count({ email: user.email });
    if (count) {
      throw new HttpException(
        'email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const result = await this.userRepository.save(user);
    return result;
  }

  async findAll(): Promise<any> {
    return { result: [{ _id: 1 }, { _id: 2 }] };
  }

  async findOne(): Promise<any> {
    return 'find one';
  }
}
