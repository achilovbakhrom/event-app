import { Module } from '@nestjs/common';
import EventController from './event.controller';
import EventService from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventEntity from './event.entity';
import LocationEntity from '../location/location.entity';
import UserEntity from '../user/user.entity';
import { EventsResolver } from './event.resolver';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, LocationEntity, UserEntity]),
    AuthModule,
  ],
  controllers: [EventController],
  providers: [EventsResolver, EventService],
  exports: [EventService],
})
export default class EventModule {}
