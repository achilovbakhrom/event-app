import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const c = GqlExecutionContext.create(ctx).getContext();

    // Graphql case
    if (c.req && c.req.user) {
      return c.req.user;
    }

    // REST Api case
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
