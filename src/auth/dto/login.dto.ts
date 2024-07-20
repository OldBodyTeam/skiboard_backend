import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '邮箱或者用户名为空' })
  readonly email_name: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码为空' })
  readonly password: string;
}
