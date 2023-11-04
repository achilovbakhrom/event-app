import { Field, ObjectType } from '@nestjs/graphql';
import EventEntity from '../event.entity';

@ObjectType('EventsResponse')
export class EventsResponse {
  @Field(() => [EventEntity], { nullable: false })
  data: EventEntity[];

  @Field({ nullable: false })
  total: number;
}
