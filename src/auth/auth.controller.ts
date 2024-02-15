import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  login(@Body() loginInfo: LoginUserDto) {
    return this.authService.validateUser(
      loginInfo.email_name,
      loginInfo.password,
    );
  }

  @Public()
  @Post('register')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  register(@Body() registerInfo: RegisterUserDto) {
    return this.authService.addUser(
      registerInfo.username,
      registerInfo.email,
      registerInfo.password,
    );
  }
}
