import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth.dto';

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
        };
      } else {
        const errors = { username: 'Password is wrong.' };
        throw new HttpException(
          { message: 'Input data validation failed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      const errors = { email_name: 'Username/email is invalid.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addUser(username: string, email: string, pass: string): Promise<User> {
    // const bcrypt = require('bcrypt');
    const users = await this.usersService.findOneByEmail(username);
    const emails = await this.usersService.findOneByEmail(email);
    if (users) {
      const errors = { username: 'Username must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else if (emails) {
      const errors = { username: 'Email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      const saltOrRounds = 10;
      newUser.password = bcrypt.hashSync(pass, saltOrRounds);
      return this.usersService.create(newUser);
    }
  }
}
