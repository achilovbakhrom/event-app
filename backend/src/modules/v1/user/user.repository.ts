import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './user.entity';
import { Repository } from 'typeorm';
import SignUpDto from '../auth/dto/sign-up.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  public create(user: SignUpDto): Promise<UserEntity> {
    return this.repository.save({
      ...user,
      email: user.email.toLocaleLowerCase(),
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: [
        {
          email: email.toLowerCase(),
        },
      ],
    });
  }
}
