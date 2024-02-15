import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserAvatarDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  @IsNotEmpty()
  file: Express.Multer.File;
}
