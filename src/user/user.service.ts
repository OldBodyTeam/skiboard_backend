import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ username: email }, { email: email }],
    });
  }

  async findOneById(userId: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: [{ id: userId }],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new CreateUserDto();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(createUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async modifyAvatar(userId: string, avatarUrl: string): Promise<User> {
    const userInfo = await this.findOneById(userId);
    if (!userInfo) {
      throw new BadRequestException('当前用户不存在', {
        cause: new Error(),
        description: 'userId不存在',
      });
    }
    userInfo.avatar = avatarUrl;
    return await this.usersRepository.save(userInfo);
  }

  async modifyUsername(userId: string, username: string): Promise<User> {
    const userInfo = await this.findOneById(userId);
    if (!userInfo) {
      throw new BadRequestException('当前用户不存在', {
        cause: new Error(),
        description: 'userId不存在',
      });
    }
    userInfo.username = username;
    return await this.usersRepository.save(userInfo);
  }
}
