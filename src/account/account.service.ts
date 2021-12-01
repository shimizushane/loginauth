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
import { VerificationCodeDto } from './dto/verification-code.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

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
    private configService: ConfigService,
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

  async remove(deleteAccountDto: DeleteAccountDto) {

    return `This action removes a account`;
  }

  async sendValidationCode(verificationCodeDto: VerificationCodeDto) {
    const { id, type } = verificationCodeDto;
    let { value } = verificationCodeDto;
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

      await transporter.verify();
      await transporter.sendMail(options);

      return {
        statusCode: '0000',
        message: 'already send validate mail',
      };
    } else if (type === VerifyType.PHONE) {
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

  async edit() {

  }

  async resetPassword() {

  }
}
