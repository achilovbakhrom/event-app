import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import EventEntity from './event.entity';
import EventService from './event.service';
import { User } from '../../../decorators/user.decorator';
import UserEntity from '../user/user.entity';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { EventFilter } from 'src/model/filter.model';
import { GraphqlJwtAccessGuard } from '../../../guards/jwt-access.guard';
import { EventsResponse } from './dto/events-response.dto';

@Resolver(() => EventEntity)
export class EventsResolver {
  constructor(private readonly service: EventService) {}

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => EventEntity)
  async createEvent(
    @Args('event') event: EventEntity,
    @User() user: UserEntity,
  ) {
    return await this.service.createEvent({ ...event, user });
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => EventEntity)
  async updateEvent(
    @Args('event') event: EventEntity,
    @User() user: UserEntity,
  ) {
    if (!event.id) {
      throw new BadRequestException('Please provide id field');
    }
    return await this.service.updateEvent(event.id, event, user);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => Boolean)
  async removeEvent(@Args('id') id: number, @User() user: UserEntity) {
    await this.service.deleteEvent(id, user);
    return true;
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Query(() => EventEntity)
  async getEvent(@Args('id') id: number) {
    return await this.service.getEventById(id);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Query(() => EventsResponse)
  async getEvents(@Args('filter') filter: EventFilter) {
    return await this.service.getEventList(
      filter.page,
      filter.size,
      filter.userId,
      filter.from,
      filter.to,
      filter.longitude,
      filter.lattitude,
    );
  }
}
