import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import LocationEntity from './location.entity';
import LocationService from './location.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GraphqlJwtAccessGuard } from '../../../guards/jwt-access.guard';
import { LocationsResponse } from './dto/location-response.dto';
import { Filter } from '../../../model/filter.model';

@Resolver(() => LocationEntity)
export class LocationsResolver {
  constructor(private readonly service: LocationService) {}

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => LocationEntity)
  async createLocation(@Args('location') location: LocationEntity) {
    return await this.service.createLocation({ ...location });
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => LocationEntity)
  async updateLocation(@Args('location') location: LocationEntity) {
    if (!location.id) {
      throw new BadRequestException('Please provide id field');
    }
    return await this.service.updateLocation(location.id, location);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Mutation(() => Boolean)
  async removeLocation(@Args('id') id: number) {
    await this.service.deleteLocation(id);
    return true;
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Query(() => LocationEntity)
  async getLocation(@Args('id') id: number) {
    return await this.service.getLocationById(id);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Query(() => LocationsResponse)
  async getLocations(@Args('filter') filter: Filter) {
    return await this.service.getLocationList(filter.page, filter.size);
  }

  @UseGuards(GraphqlJwtAccessGuard)
  @Query(() => [LocationEntity])
  async getSelectLocations() {
    return (await this.service.getLocationList(0, 200)).data;
  }
}
