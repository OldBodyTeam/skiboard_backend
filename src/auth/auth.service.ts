import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth.dto';
import { modifyPasswordDto } from './dto/modify-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email_name: string, pass: string): Promise<AuthUserDto> {
    const user = await this.usersService.findOneByEmail(email_name);
    // bcrypt.compare(pass, user.password);
    if (user) {
      if (bcrypt.compareSync(pass, user.password)) {
        const payload = { username: user.username, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
          message: '登录成功',
          userId: user.id,
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: '密码错误',
            code: 'PasswordError',
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: new Error('密码错误'),
            description: 'PasswordError',
          },
        );
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '用户名或者邮箱不存在，请确认后登录',
          code: 'LoginUserNotFound',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error('用户名或者邮箱不存在，请确认后登录'),
          description: 'LoginUserNotFound',
        },
      );
    }
  }

  async addUser(
    username: string,
    email: string,
    pass: string,
  ): Promise<UserEntity> {
    const users = await this.usersService.findOneByEmail(username);
    const emails = await this.usersService.findOneByEmail(email);
    if (users) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '用户名已被注册，请重新注册',
          code: 'UsernameRepeat',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error('Username must be unique'),
          description: 'UsernameRepeat',
        },
      );
    } else if (emails) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '邮箱已被注册，请重新注册',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error('Email must be unique'),
          description: 'EmailRepeat',
        },
      );
    } else {
      const newUser = new UserEntity();
      newUser.username = username;
      newUser.email = email;
      const saltOrRounds = 10;
      newUser.password = bcrypt.hashSync(pass, saltOrRounds);
      return this.usersService.create(newUser);
    }
  }
  async modifyPassword(modifyPassword: modifyPasswordDto) {
    const user = await this.usersService.findOneByEmail(modifyPassword.email);
    if (user) {
      const newUser = new UserEntity();
      newUser.username = user.username;
      newUser.email = user.email;
      const saltOrRounds = 10;
      newUser.password = bcrypt.hashSync(
        modifyPassword.passwordOne,
        saltOrRounds,
      );
      return this.usersService.create(newUser);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '用户不存在，无法修改密码',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: new Error('user not found'),
          description: 'UserNotFount',
        },
      );
    }
  }
}
