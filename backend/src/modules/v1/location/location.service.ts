import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import LocationEntity from './location.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly repository: Repository<LocationEntity>,
  ) {}

  public async createLocation(location: LocationEntity) {
    const found = await this.repository.findOne({
      where: { longitude: location.longitude, lattitude: location.lattitude },
    });
    if (found) {
      return found;
    }
    return this.repository.save(location);
  }
  public async updateLocation(id: number, location: LocationEntity) {
    const found = await this.repository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException('Location is not found');
    }

    return this.repository.save({
      ...found,
      ...location,
      id,
    });
  }

  public deleteLocation(id: number) {
    return this.repository.delete(id);
  }

  public async getLocationList(page: number, size: number) {
    const result = await this.repository.findAndCount({
      skip: page * size,
      take: size,
      order: {
        id: 'DESC',
      },
    });

    return {
      data: result[0],
      total: result[1],
    };
  }

  public getLocationById(id: number) {
    return this.repository.findOne({ where: { id } });
  }
}
