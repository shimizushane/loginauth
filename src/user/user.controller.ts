import { Controller, Post, UsePipes, Body } from '@nestjs/common';
import { UserDtoValidationPipe } from 'src/pipes/userDtoValidation.pipe';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UserService } from './user.service';

@Controller('register')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(UserDtoValidationPipe)
  async createUserHandler(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);
    return result;
  }
}
