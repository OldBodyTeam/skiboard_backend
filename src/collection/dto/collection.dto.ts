import { ApiProperty } from '@nestjs/swagger';

export class CollectionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createTime: Date;

  @ApiProperty()
  updateTime: Date;
}
