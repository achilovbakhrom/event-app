import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T> {
  @ApiProperty()
  readonly data: T;
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly success: boolean;
}

export class IPaginationData<T> {
  data: T;
  total: number;
}
