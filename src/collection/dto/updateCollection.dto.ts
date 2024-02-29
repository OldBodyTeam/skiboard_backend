import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateCollectionDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  frameList?: string;
}
