import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import OSS from 'ali-oss';

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

  async remove(id: string): Promise<void> {
    // 查找用户
    const user = await this.findOneById(id);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    // 删除阿里云OSS上的头像文件
    if (user.avatar && !user.avatar.includes('default-avatar.png')) {
      try {
        const OSSClient = new OSS({
          region: 'oss-cn-beijing',
          accessKeyId: process.env.OSSAccessKeyId,
          accessKeySecret: process.env.OSSAccessKeySecret,
          bucket: 'ski-music',
        });

        // 解析头像URL获取文件路径
        const avatarPath = new URL(user.avatar).pathname;
        await OSSClient.delete(avatarPath);
      } catch (e) {
        Logger.error('删除用户头像失败', e);
      }
    }

    // 软删除用户
    await this.usersRepository.softDelete(id);
  }

  async delete(id: string): Promise<void> {
    return this.remove(id);
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
