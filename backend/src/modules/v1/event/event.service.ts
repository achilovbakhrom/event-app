import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import EventEntity from './event.entity';
import { Repository } from 'typeorm';
import LocationEntity from '../location/location.entity';
import UserEntity from '../user/user.entity';
import { plainToClass } from 'class-transformer';
import { Between, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';

@Injectable()
export default class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  public async createEvent(event: EventEntity) {
    if (event.location && event.location.id) {
      const found = await this.locationRepository.findOne({
        where: {
          id: event.location.id,
        },
      });
      if (!found) {
        throw new BadRequestException('Provided location does not exist in db');
      }
    }
    return plainToClass(EventEntity, await this.eventRepository.save(event));
  }

  public async updateEvent(
    id: number,
    newEvent: EventEntity,
    user: UserEntity,
  ) {
    const found = await this.eventRepository.findOne({
      where: { id },
      relations: ['location', 'user'],
    });
    if (!found) {
      throw new BadRequestException('Event could not be found');
    }
    if (!found.user || found.user.id !== user.id) {
      throw new ForbiddenException('User has no permission to update');
    }

    if (newEvent.location && newEvent.location.id) {
      const found = await this.locationRepository.findOne({
        where: {
          id: newEvent.location.id,
        },
      });
      if (!found) {
        throw new BadRequestException('Provided location does not exist in db');
      }
    }

    return plainToClass(
      EventEntity,
      await this.eventRepository.save({ ...found, ...newEvent, id }),
    );
  }

  public async deleteEvent(id: number, user: UserEntity) {
    const found = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!found) {
      throw new BadRequestException('Event could not be found');
    }

    if (!found.user || found.user.id !== user.id) {
      throw new ForbiddenException('User has no permission for deletion');
    }

    return this.eventRepository.delete(id);
  }

  public async getEventList(
    page: number,
    size: number,
    userId?: number,
    from?: Date,
    to?: Date,
    longitude?: string,
    lattitude?: string,
  ) {
    let where: any = {};

    if (userId) {
      where = { user: { id: userId } };
    }
    if (from && to) {
      where = { ...where, startDate: Between(from, to) };
    } else if (from) {
      where = { ...where, startDate: MoreThanOrEqual(from) };
    } else if (to) {
      where = { ...where, startDate: LessThanOrEqual(to) };
    }

    if (longitude) {
      where = {
        ...where,
        location: { longitude },
      };
    }
    if (lattitude) {
      where = {
        ...where,
        location: where.location
          ? { ...where.location, lattitude }
          : { lattitude },
      };
    }

    const result = await this.eventRepository.findAndCount({
      where,
      skip: page * size,
      take: size,
      relations: ['location'],
      order: {
        id: 'DESC',
      },
    });
    return {
      data: result[0],
      total: result[1],
    };
  }

  public async getEventById(id: number) {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['location'],
    });
  }
}
