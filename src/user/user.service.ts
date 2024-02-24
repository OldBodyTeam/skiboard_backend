import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: [{ username: email }, { email: email }],
    });
  }

  async findOneById(userId: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({
      where: [{ id: userId }],
    });
  }

  async create(createUserDto: UserEntity): Promise<UserEntity> {
    const user = new UserEntity();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.usersRepository.save(createUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async modifyAvatar(userId: string, avatarUrl: string): Promise<UserEntity> {
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

  async modifyUsername(userId: string, username: string): Promise<UserEntity> {
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
