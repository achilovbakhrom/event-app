import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export default class AuthRepository {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async addToken(email: string, token: string) {
    await this.redis.set(email, token, 'EX', 86400);
  }

  public async getToken(email: string): Promise<string | undefined> {
    return await this.redis.get(email);
  }

  public async removeToken(email: string): Promise<void> {
    await this.redis.del(email);
  }
}
