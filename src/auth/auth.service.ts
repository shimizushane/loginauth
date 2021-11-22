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
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, mpassword: string): Promise<any> {
    const user = await this.accountService.findAccount(email);

    if (user && user.password === mpassword) {
      const { password, ...result } = user;
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
    id
    ip: string,
    user_agent: string,
    token: string,
  ): Promise<void> {
    const login = new Login();
  }
}
