import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import AuthService from './auth.service';
import TokenDto from './dto/token.dto';
import SignInDto from './dto/sign-in.dto';
import { User } from '../../../decorators/user.decorator';
import UserEntity from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAccessGuard } from '../../../guards/jwt-access.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => TokenDto)
  async login(@Args('user') user: SignInDto) {
    return await this.authService.signIn(user);
  }

  @Mutation(() => UserEntity)
  async signUp(@Args('user') user: SignInDto) {
    return await this.authService.signUp(user);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => Boolean)
  async logout(@User() user: UserEntity) {
    await this.authService.logout(user.email);
    return true;
  }
}
