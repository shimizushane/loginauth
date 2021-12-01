import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  Req,
  Request,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { VerificationCodeDto } from './dto/verification-code.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) { }

  @Post('validate')
  @UsePipes(ValidationPipe)
  validate(@Body() validateCodeDto: ValidateCodeDto) {
    return this.accountService.validate(validateCodeDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  @Get('verificationCode')
  @UsePipes(ValidationPipe)
  verificationCode(@Query() verificationCodeDto: VerificationCodeDto) {
    return this.accountService.sendValidationCode(verificationCodeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }

  @Delete('delete')
  @UsePipes(ValidationPipe)
  remove(@Body() deleteAccountDto: DeleteAccountDto) {
    return this.accountService.remove(deleteAccountDto);
  }
}
