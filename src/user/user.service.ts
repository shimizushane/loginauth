import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  async create(user: User): Promise<any> {
    return { _id: 1, ...user };
  }

  async findAll(): Promise<any> {
    return { result: [{ _id: 1 }, { _id: 2 }] };
  }
}
