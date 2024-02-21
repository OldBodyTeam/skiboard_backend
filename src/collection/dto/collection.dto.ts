import { ApiProperty } from '@nestjs/swagger';

export class CollectionDto {
  @ApiProperty()
  name: string;
}
