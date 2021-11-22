import { Injectable } from '@nestjs/common';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './entities/user-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
  ) {}

  async create(createUserInfoDto: CreateUserInfoDto) {
    return 'This action adds a new userInfo';
  }

  async findAll() {
    return `This action returns all userInfo`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} userInfo`;
  }

  async update(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    return `This action updates a #${id} userInfo`;
  }

  async remove(id: number) {
    return `This action removes a #${id} userInfo`;
  }
}
