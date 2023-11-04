import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType('TokenDto')
export default class TokenDto {
  @Field()
  @ApiProperty({
    type: String,
  })
  readonly accessToken: string = '';
}
