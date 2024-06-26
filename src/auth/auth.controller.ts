import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { AuthUserDto } from './dto/auth.dto';
import { UserEntity } from 'src/user/user.entity';
import { AuthGuard } from './auth.guard';
import { modifyPasswordDto } from './dto/modify-password.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiExtraModels(AuthUserDto)
  @ApiOkResponse({
    status: 'default',
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(AuthUserDto) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  login(@Body() loginInfo: LoginUserDto): Promise<AuthUserDto> {
    return this.authService.validateUser(
      loginInfo.email_name,
      loginInfo.password,
    );
  }

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiOkResponse({
    status: 'default',
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(UserEntity) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  register(@Body() registerInfo: RegisterUserDto): Promise<UserEntity> {
    return this.authService.addUser(
      registerInfo.username,
      registerInfo.email,
      registerInfo.password,
    );
  }
  // husbend
  @Public()
  @UseGuards(AuthGuard)
  @Get('profile')
  @HttpCode(200)
  @ApiOkResponse({
    status: 'default',
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            sub: { type: 'string' },
          },
        },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  getProfile(@Request() req): Promise<{ sub: string }> {
    return req.user;
  }
  // 修改密码
  @Public()
  @Post('modify-password')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @ApiOkResponse({
    status: 'default',
    description: 'The record has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(UserEntity) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  modifyPassword(
    @Body() modifyPassword: modifyPasswordDto,
  ): Promise<UserEntity> {
    return this.authService.modifyPassword(modifyPassword);
  }
}
