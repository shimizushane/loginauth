import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { ReqVerifyCodeDto } from './dto/req-verify-code.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { AppResponse } from 'src/misc/app.response';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('validate')
  async validate(@Body() validateCodeDto: ValidateCodeDto) {
    return this.accountService.validate(validateCodeDto);
  }

  @Post('register')
  async create(@Body() createAccountDto: CreateAccountDto) {
    await this.accountService.create(createAccountDto);
    return new AppResponse('0000', 'account is registered');
  }

  @Get('reqVerifyCode')
  async reqVerifyCode(@Query() reqVerifyCodeDto: ReqVerifyCodeDto) {
    return this.accountService.sendValidationCode(reqVerifyCodeDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body()
    updateAccountDto: UpdateAccountDto,
  ) {
    this.accountService.update(id, updateAccountDto);
    return new AppResponse('0000', 'account is updated');
  }

  @Patch('/resetPassword/:id')
  async resetPassword(
    @Param('id') id: string,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.accountService.resetPassword(id, resetPasswordDto.new_password);
    return new AppResponse('0000', 'password is reseted');
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    await this.accountService.remove(id);
    return new AppResponse('0000', 'account is delete');
  }
}
