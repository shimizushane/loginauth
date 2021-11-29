import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Login } from 'src/auth/entities/login.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<any> {
    const isExist = await this.accountRepository.count({
      email: createAccountDto.email,
    });
    if (isExist) {
      throw new HttpException(
        'email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = new Account();
    const userInfo = new UserInfo();
    const login = new Login();

    account.email = createAccountDto.email;
    account.password = createAccountDto.password;
    account.user_info = userInfo;
    account.login = login;

    return this.accountRepository.save(account);
  }

  findAll() {
    return `This action returns all account`;
  }

  async findAccount(email: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { email },
      relations: ['login', 'user_info'],
    });

    if (account) {
      return account;
    }
    throw new HttpException('not found user', HttpStatus.NOT_FOUND);
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
