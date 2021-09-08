import { Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('user')
export class UserController {
  @Post()
  async create(@Res() res: Response) {
    return res.status(HttpStatus.OK).json({ msg: 'hello world' });
  }
}
