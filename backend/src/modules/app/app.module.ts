import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import UserEntity from '../v1/user/user.entity';
import V1Module from '../v1/v1.module';
import EventEntity from '../v1/event/event.entity';
import LocationEntity from '../v1/location/location.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import EventModule from '../v1/event/event.module';
import AuthModule from '../v1/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRESQL_HOST,
      port: process.env.POSTGRESQL_PORT as unknown as number,
      database: process.env.POSTGRESQL_DB,
      username: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      entities: [UserEntity, EventEntity, LocationEntity],
      migrationsTableName: 'event_migrations',
      migrations: ['dist/migrations/*{.ts, .js}'],
      migrationsRun: true,
      synchronize: true,
    }),
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
    V1Module,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
    }),
    AuthModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
