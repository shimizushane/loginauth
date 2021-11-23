import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { Account } from 'src/account/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, mpassword: string): Promise<any> {
    const account = await this.accountService.findAccount(email);
    let login = account.login;

    if (!login) {
      login = new Login();
      login.account = account;
      this.accountRepository.update(account.id, { login: login });
      this.loginRepository.save(login);
    }

    if (account && account.password != mpassword) {
      login.fail_count += 1;
      if (login.fail_count > 5) {
        login.locked = true;
      }
      // this.loginRepository.update(account.login, login);
    } else if (account && account.password === mpassword) {
      const { password, ...result } = account;
      login.success_count += 1;
      // this.loginRepository.update(account.login, login);
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
    id,
    ip: string,
    user_agent: string,
    token: string,
  ): Promise<void> {
    const login = new Login();
  }
}
