import { Module } from '@nestjs/common';
import LocationService from './location.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import LocationEntity from './location.entity';
import LocationController from './location.controller';
import AuthModule from '../auth/auth.module';
import { LocationsResolver } from './location.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity]), AuthModule],
  controllers: [LocationController],
  providers: [LocationService, LocationsResolver],
  exports: [LocationService],
})
export default class LocationModule {}
