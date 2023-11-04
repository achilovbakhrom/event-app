import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import TokenDto from './dto/token.dto';
import SignInDto from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import AuthRepository from './auth.repository';
import UsersService from '../user/user.service';
import SignUpDto from './dto/sign-up.dto';
import UserEntity from '../user/user.entity';
import * as bcrypt from 'bcrypt';

import { plainToClass } from 'class-transformer';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly authRepository: AuthRepository,
  ) {}

  async signIn(data: SignInDto): Promise<TokenDto> {
    const user = await this.userService.getByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user?.password ?? '',
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid User Credentials');
    }

    const payload = {
      id: user.id,
      email: data.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: process.env.JWT_SECRET,
    });

    await this.authRepository.addToken(data.email, accessToken);

    return {
      accessToken,
    };
  }

  async logout(email: string) {
    await this.authRepository.removeToken(email);
  }

  async getToken(email: string): Promise<string | undefined> {
    return this.authRepository.getToken(email);
  }

  async signUp(data: SignUpDto): Promise<UserEntity> {
    return plainToClass(UserEntity, await this.userService.create(data));
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<null | { id: number; email: string }> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not exists!');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return {
        id: user.id,
        email: user.email,
      };
    }

    return null;
  }
}
