import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsNumberString,
  IsDate,
} from 'class-validator';

@InputType('FilterInput')
@ObjectType({ description: 'eventFilter' })
export class Filter {
  @ApiProperty({ type: Number, required: true })
  @Field({ nullable: false })
  @IsNotEmpty()
  readonly page: number;

  @ApiProperty({ type: Number, required: true })
  @Field({ nullable: false })
  @IsNotEmpty()
  readonly size: number;

  @ApiProperty({ type: Number, required: false })
  @Field({ nullable: true })
  readonly userId: number;

  @ApiProperty({ type: String, required: false })
  @Field({ nullable: true })
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @IsOptional()
  readonly from?: Date | null;

  @ApiProperty({ type: String, required: false })
  @Field({ nullable: true })
  @Transform(({ value }) => (value ? new Date(value) : null))
  @IsDate()
  @IsOptional()
  readonly to?: Date | null;
}

@InputType('EventFilterInput')
@ObjectType({ description: 'eventFilter' })
export class EventFilter extends Filter {
  @ApiProperty({ type: String, required: false })
  @Field({ nullable: true })
  @IsNumberString()
  @IsOptional()
  readonly longitude?: string | null;

  @ApiProperty({ type: String, required: false })
  @Field({ nullable: true })
  @IsNumberString()
  @IsOptional()
  readonly lattitude?: string | null;
}
