import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { LoginInfo } from './entities/login_info.entity';
import { Account } from 'src/account/entities/account.entity';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class AuthService {
  private failLimit: number;

  private failAndWaitTime: number;

  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(LoginInfo)
    private login_infoRepository: Repository<LoginInfo>,
    private configService: ConfigService,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {
    this.failLimit = 3;
    this.failAndWaitTime = 1;
  }

  async validateUser(email: string, mpassword: string): Promise<any> {
    const account = await this.accountService.findAccount(email);
    const { login } = account;

    if (login.locked) {
      if (
        dayjs()
          .utc()
          .isAfter(dayjs(login.updated_at).utc().add(this.failAndWaitTime, 'h'))
      ) {
        login.fail_count = 0;
        login.locked = false;
      } else {
        throw new HttpException(
          'An incorrect password was entered more than three times, wait for 1 hours and try again',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    if (account && account.password != mpassword) {
      login.fail_count += 1;
      if (login.fail_count > this.failLimit) {
        login.locked = true;
      }
      this.loginRepository.save(login);
    } else if (account && account.password === mpassword) {
      const { password, ...result } = account;
      login.success_count += 1;
      login.fail_count = 0;
      this.loginRepository.save(login);
      return result;
    }
    return null;
  }

  // 驗正完，製作token
  async createToken(account: Account) {
    const payload = { id: account.id };
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
    };
  }

  async updateLoginInfo(
    login: Login,
    clientAgent: string,
    clientIp: string,
  ): Promise<any> {
    let logininfo = await this.login_infoRepository.findOne({
      user_agent: clientAgent,
      ip: clientIp,
      login: login,
    }); // 要搜尋login，非login_info

    if (typeof logininfo === 'undefined') {
      logininfo = new LoginInfo();
      logininfo.ip = clientIp;
      logininfo.user_agent = clientAgent;
      logininfo.login = login;

      return this.login_infoRepository.save(logininfo);
    }

    return this.login_infoRepository.increment(
      { id: logininfo.id },
      'count',
      1,
    );
  }

  async resetPasswordByEmail() {

  }

  async resetPasswordByPhone() {

  }


}
