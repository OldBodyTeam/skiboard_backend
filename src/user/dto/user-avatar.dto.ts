import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserAvatarDto {
  @ApiProperty({ type: 'FormData', format: 'FormData', required: true })
  @IsNotEmpty()
  file: Express.Multer.File;
}
