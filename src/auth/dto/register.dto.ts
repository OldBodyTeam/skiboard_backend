import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  ValidationArguments,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名为空' })
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: (data: ValidationArguments) => {
        if (!data.value) return '邮箱为空';
        return '邮箱格式不正确';
      },
    },
  )
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: '密码为空' })
  readonly password: string;
}
