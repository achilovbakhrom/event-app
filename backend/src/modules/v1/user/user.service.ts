import { ConflictException, Injectable } from '@nestjs/common';
import UsersRepository from './user.repository';
import SignUpDto from '../auth/dto/sign-up.dto';
import UserEntity from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  public async create(user: SignUpDto): Promise<UserEntity> {
    const resultEmail = await this.userRepository.getByEmail(user.email);
    if (resultEmail) {
      throw new ConflictException(`User ${user.email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  public async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.getByEmail(email);
  }
}
