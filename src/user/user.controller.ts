import {
  Controller,
  Post,
  Res,
  HttpStatus,
  UsePipes,
  Body,
  HttpException,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDtoValidationPipe } from 'src/pipes/userDtoValidation.pipe';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(UserDtoValidationPipe)
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    this.userService
      .create(createUserDto)
      .then((result: any) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((error: any) => {
        throw new HttpException('server error', 404);
      });
  }

  @Get('/list')
  async findAll(@Res() res: Response) {
    this.userService
      .findAll()
      .then((result: any) => {
        return res.status(HttpStatus.OK).json(result);
      })
      .catch((error: any) => {
        throw new HttpException('server error', 404);
      });
  }
}
