import {
  CACHE_MANAGER,
  Inject,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/user-info/entities/user-info.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { Login } from 'src/auth/entities/login.entity';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import { ReqVerifyCodeDto } from './dto/req-verify-code.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { AppResponse } from 'src/misc/app.response';

enum VerifyType {
  EMAIL = 'email',
  PHONE = 'phone',
}

@Injectable()
export class AccountService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(UserInfo)
    private userInfoRepository: Repository<UserInfo>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    private configService: ConfigService,
  ) { }

  async create(createAccountDto: CreateAccountDto): Promise<void> {
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

    await this.accountRepository.save(account);
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

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<void> {
    this.accountRepository.update(id, updateAccountDto);
  }

  async resetPassword(id: string, password: string): Promise<void> {
    this.accountRepository.update(id, { password });
  }

  async remove(id) {
    const deleteAccount = await this.accountRepository.findOne({
      where: { id },
      relations: ['login', 'user_info'],
    });
    const deleteUserInfo = await this.userInfoRepository.findOne(
      deleteAccount.user_info.id,
    );

    const deleteLogin = await this.loginRepository.findOne(
      deleteAccount.login.id,
    );

    await this.loginRepository.remove(deleteLogin);
    await this.userInfoRepository.remove(deleteUserInfo);
  }

  async sendValidationCode(
    reqVerifyCodeDto: ReqVerifyCodeDto,
  ): Promise<AppResponse> {
    const { id, type } = reqVerifyCodeDto;
    let { value } = reqVerifyCodeDto;
    let codeArr: Array<any> = await this.cacheManager.get(id);

    if (type === VerifyType.EMAIL) {
      const config = this.configService.get('mailConfig');
      const code = String(Math.random()).substring(2, 8);

      if (!value) {
        const test = await this.accountRepository.findOne({
          select: ['email'],
          where: { id },
        });
        value = test.email;
      }

      if (codeArr) {
        codeArr.push({ type, code });
      } else {
        codeArr = [{ type, code }];
      }

      const transporter = nodemailer.createTransport({
        host: config.mail_host,
        port: config.mail_port,
        auth: {
          user: config.mail_sender,
          pass: config.mail_password,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const options = {
        from: config.mail_sender,
        to: value,
        subject: '驗證信箱',
        text: `驗證碼：${code}`,
      };

      await transporter.verify(); // 之後要刪除。確認mail server能運行。
      await transporter.sendMail(options);
      return new AppResponse('0000', 'already send validate code to email');
    } else if (type === VerifyType.PHONE) {
      return new AppResponse('0000', 'already send validate code to phone');
    }
  }

  async validate(parameter: { id: string; type: VerifyType; code: string }) {
    let result = false;
    const codeArr: Array<any> | null = await this.cacheManager.get(
      parameter.id,
    );

    if (codeArr) {
      result = codeArr.some(
        (item: { type: VerifyType; code: string }) =>
          item.type == parameter.type && item.code == parameter.code,
      );
    }

    if (result) {
      this.accountRepository.update(
        { id: parameter.id },
        { validate_email: true },
      );
      return {
        returCode: '0000',
        message: 'validate code success',
      };
    }

    throw new HttpException(
      'validate code wrong try again',
      HttpStatus.BAD_REQUEST,
    );
  }

  async checkPassword(id: string, password: string): Promise<void> {
    const [accounts, count] = await this.accountRepository.findAndCount({
      id,
    });

    if (count != 1) {
      throw new HttpException(
        'account is none or more than one',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (accounts[0].password != password) {
      throw new HttpException('password is wrong', HttpStatus.BAD_REQUEST);
    }
  }
}
