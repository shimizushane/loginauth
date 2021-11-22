import { Controller, Post, UseGuards, Request, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthGuard('local')) // AuthGuard驗證完後，回丟，加在req裏面
  @Post('login')
  async login(@Request() req, @Headers() headers): Promise<any> {
    console.log('login:', req);
    const { id } = req.user;

    console.log('headers:', headers['user-agent']);
    console.log('ip1:', req.connection.remoteAddress);
    console.log('ip1:', req.connection.remotePort);
    // 抓 header
    const result = await this.authService.createToken(req.user);
    
    await this.authService.updateLoginInfo(req.connection.remoteAddress,)
    console.log('token:', result.access_token);
    return result;
  }
}
