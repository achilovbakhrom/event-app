import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import EventEntity from '../event/event.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';
import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType('LocationInput')
@ObjectType({ description: 'location' })
@Entity('locations')
export default class LocationEntity {
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field({ nullable: false })
  @IsNumberString()
  @IsNotEmpty()
  @Column({ nullable: false, length: 64 })
  readonly lattitude: string;

  @Field({ nullable: false })
  @IsNumberString()
  @IsNotEmpty()
  @Column({ nullable: false, length: 64 })
  readonly longitude: string;

  @Field(() => [EventEntity], { nullable: true })
  @Exclude()
  @IsOptional()
  @OneToMany(() => EventEntity, (event) => event.location, {
    nullable: true,
  })
  readonly events?: EventEntity[];
}
