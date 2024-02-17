import { ApiProperty } from '@nestjs/swagger';

export class InterceptedAxios<T = any> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  msg: string;

  @ApiProperty()
  code: number;
}
