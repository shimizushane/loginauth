import { Controller, Get, Post, Delete } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Post('login')
  createUserSessionHandler(): string {
    return 'create user success';
  }

  @Get('info')
  getUserSessionHandler(): string {
    return 'session id info';
  }

  @Delete('logout')
  invalidateUserSessionHandler(): string {
    return 'user logout';
  }
}
