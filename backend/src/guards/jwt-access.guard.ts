import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import UserEntity from '../modules/v1/user/user.entity';
import AuthService from '../modules/v1/auth/auth.service';

@Injectable()
export default class JwtAccessGuard extends AuthGuard('jwt') {
  constructor(private service: AuthService) {
    super('jwt');
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    if (
      request &&
      request.user &&
      request.headers &&
      request.headers['authorization']
    ) {
      const token = request.headers['authorization'];
      const savedToken = await this.service.getToken(request.user.email);
      const isTokenCorrect = token === `Bearer ${savedToken}`;
      if (!isTokenCorrect) {
        throw new UnauthorizedException();
      }
    }
    return parentCanActivate;
  }
}

@Injectable()
export class GraphqlJwtAccessGuard extends AuthGuard('jwt') {
  constructor(private service: AuthService) {
    super('jwt');
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return request;
  }

  async canActivate(context: ExecutionContext) {
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    if (request) {
      const user: UserEntity = request.user;
      const headers = request.headers;
      if (headers && headers['authorization']) {
        const token = headers['authorization'];
        const savedToken = await this.service.getToken(user.email);
        const isTokenCorrect = token === `Bearer ${savedToken}`;
        if (!isTokenCorrect) {
          throw new UnauthorizedException();
        }
      }
    }
    return parentCanActivate;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }
    return user;
  }
}
