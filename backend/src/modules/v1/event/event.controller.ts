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
import { IPaginationData, IResponse } from '../../../model/response.model';
import EventEntity from './event.entity';
import { ResponseUtils } from '../../../utils/response.utils';
import EventService from './event.service';
import UserEntity from '../user/user.entity';
import { User } from '../../../decorators/user.decorator';
import JwtAccessGuard from '../../../guards/jwt-access.guard';
import { EventFilter } from '../../../model/filter.model';

@ApiTags('Events')
@Controller()
export default class EventController {
  constructor(private readonly service: EventService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Post()
  async createEvent(
    @User() user: UserEntity,
    @Body() event: EventEntity,
  ): Promise<IResponse<EventEntity>> {
    return ResponseUtils.ok(
      await this.service.createEvent({
        ...event,
        user,
      }),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Put()
  async updateEvent(
    @Body() event: EventEntity,
    @User() user: UserEntity,
  ): Promise<IResponse<EventEntity>> {
    if (!event.id) {
      throw new BadRequestException('Entity should have the id field');
    }
    return ResponseUtils.ok(
      await this.service.updateEvent(event.id, event, user),
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @User() user: UserEntity,
  ): Promise<IResponse<any>> {
    return ResponseUtils.ok(await this.service.deleteEvent(id, user));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IResponse<EventEntity | null>> {
    return ResponseUtils.ok(await this.service.getEventById(id));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get()
  async getAll(
    @Query() filter: EventFilter,
  ): Promise<IResponse<IPaginationData<EventEntity[] | null>>> {
    return ResponseUtils.ok(
      await this.service.getEventList(
        filter.page,
        filter.size,
        filter.userId,
        filter.from,
        filter.to,
        filter.longitude,
        filter.lattitude,
      ),
    );
  }
}
