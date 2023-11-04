import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseUtils } from '../../../utils/response.utils';
import { IResponse } from '../../../model/response.model';
import AuthService from './auth.service';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import UserEntity from '../user/user.entity';
import { User } from '../../../decorators/user.decorator';
import JwtAccessGuard from '../../../guards/jwt-access.guard';

@ApiTags('Auth')
@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() user: SignInDto): Promise<IResponse<any> | never> {
    return ResponseUtils.ok(
      await this.authService.signIn(user),
      'Successfully logged in',
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto): Promise<IResponse<UserEntity>> {
    return ResponseUtils.ok(
      await this.authService.signUp(user),
      'Successfully signed up',
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post('logout')
  async logout(@User() user: UserEntity): Promise<void> {
    await this.authService.logout(user.email);
  }
}
