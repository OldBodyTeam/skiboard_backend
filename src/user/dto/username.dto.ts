import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsernameDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
