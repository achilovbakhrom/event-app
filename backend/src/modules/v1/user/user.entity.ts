import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import EventEntity from '../event/event.entity';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@InputType('UserInput')
@ObjectType({ description: 'user' })
@Entity('users')
export default class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: false })
  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly email: string;

  @Exclude({ toPlainOnly: true })
  @Field({ nullable: false })
  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  password?: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt?: Date;

  @Field(() => [EventEntity])
  @OneToMany(() => EventEntity, (event) => event.user, { onDelete: 'CASCADE' })
  readonly events: EventEntity[];
}
