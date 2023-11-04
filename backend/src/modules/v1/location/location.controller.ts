import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import LocationService from './location.service';
import { IPaginationData, IResponse } from 'src/model/response.model';
import LocationEntity from './location.entity';
import JwtAccessGuard from '../../../guards/jwt-access.guard';
import { ResponseUtils } from 'src/utils/response.utils';

@ApiTags('Locations')
@Controller()
export default class LocationController {
  constructor(private readonly service: LocationService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post()
  async createLocation(
    @Body() location: LocationEntity,
  ): Promise<IResponse<LocationEntity>> {
    return ResponseUtils.ok(await this.service.createLocation(location));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Put()
  async updateLocation(
    @Body() location: LocationEntity,
  ): Promise<IResponse<LocationEntity>> {
    if (!location.id) {
      throw new BadRequestException('Entity should have the id field');
    }
    return ResponseUtils.ok(
      await this.service.updateLocation(location.id, location),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  async deleteLocation(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<any>> {
    return ResponseUtils.ok(await this.service.deleteLocation(id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get()
  async getAll(
    @Query('page') page: number = 0,
    @Query('size') size: number = 20,
  ): Promise<IResponse<IPaginationData<LocationEntity[]>>> {
    return ResponseUtils.ok(await this.service.getLocationList(page, size));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<LocationEntity | null>> {
    return ResponseUtils.ok(await this.service.getLocationById(id));
  }
}
