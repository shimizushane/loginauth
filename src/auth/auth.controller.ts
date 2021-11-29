import { Controller, Post, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Login } from './entities/login.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local')) // AuthGuard驗證完後，回丟，加在req裏面
  @Post('login')
  async login(@Request() req, @Headers() headers): Promise<any> {
    const login: Login = req.user.login;
    const clientAgent = headers['user-agent'];
    const clientIp = req.connection.remoteAddress.replace(/^.*:/, '');

    const result = await this.authService.createToken(req.user);
    this.authService.updateLoginInfo(login, clientAgent, clientIp);
    return result;
  }
}
