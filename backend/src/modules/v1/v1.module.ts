import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';
import EventModule from './event/event.module';
import LocationModule from './location/location.module';

const routes = [
  {
    path: '/auth',
    module: AuthModule,
  },
  {
    path: '/event',
    module: EventModule,
  },
  {
    path: '/location',
    module: LocationModule,
  },
];

@Module({
  imports: [
    ...routes.map((item) => item.module),
    UserModule,
    RouterModule.register(routes),
  ],
})
export default class V1Module {}
