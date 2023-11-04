import { Field, ObjectType } from '@nestjs/graphql';
import LocationEntity from '../location.entity';

@ObjectType('LocationsResponse')
export class LocationsResponse {
  @Field(() => [LocationEntity], { nullable: false })
  data: LocationEntity[];

  @Field({ nullable: false })
  total: number;
}
