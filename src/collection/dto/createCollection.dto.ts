import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  name: string;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  @IsNotEmpty({ message: 'The field name cannot be empty' })
  frameList: string;
}
