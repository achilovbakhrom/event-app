import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from '../user/user.entity';
import LocationEntity from '../location/location.entity';
import { Exclude, Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('EventInput')
@ObjectType({ description: 'event' })
@Entity('events')
export default class EventEntity {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: false })
  @IsNotEmpty()
  @Column({ length: 255, default: '' })
  readonly name: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @Column({ nullable: true, type: 'timestamptz' })
  readonly startDate: Date;

  @Field({ nullable: true })
  @IsNotEmpty()
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @Column({ nullable: true, type: 'timestamptz' })
  readonly endDate: Date;

  @Field({ nullable: true })
  @IsOptional()
  @Column({ nullable: true, length: 255 })
  readonly description?: string;

  @Field(() => [UserEntity], { nullable: true })
  @Exclude()
  @IsOptional()
  @ManyToOne(() => UserEntity, (user) => user.events)
  @JoinColumn({ name: 'userId' })
  readonly user: UserEntity;

  @Field(() => LocationEntity, { nullable: true })
  @IsOptional()
  @ManyToOne(() => LocationEntity, (location) => location.events, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'locationId' })
  readonly location?: LocationEntity;
}
