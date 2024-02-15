import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Post,
  Controller,
  HttpCode,
  Put,
  Param,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import OSS from 'ali-oss';
import { Injectable } from '@nestjs/common';
import { UserAvatarDto } from './dto/user-avatar.dto';
import { UsernameDto } from './dto/username.dto';
import { User } from './user.entity';
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@Injectable()
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Post()
  @HttpCode(200)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  // https://stackoverflow.com/questions/66605192/file-uploading-along-with-other-data-in-swagger-nestjs
  @Put(':id/avatar')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: String })
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards()
  // @UseGuards(JwtAuthGuard)
  async modifyAvatar(
    @Param() userId: { id: string },
    @Body() data: UserAvatarDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 })],
      }),
    )
    file,
  ): Promise<{ avatarUrl: string }> {
    // 上传阿里云 新增事务
    try {
      const OSSClient = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: process.env.OSSAccessKeyId,
        accessKeySecret: process.env.OSSAccessKeySecret,
        bucket: 'ski-music',
      });
      const avatarUrlInfo = (await OSSClient.put(
        `avatar/${userId.id}/${file.originalname}`,
        file.buffer,
      )) as { url: string };
      // 修改
      await this.usersService.modifyAvatar(userId.id, avatarUrlInfo.url);
      return { avatarUrl: avatarUrlInfo.url };
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('阿里云文件上传失败, 更新头像失败');
    }
  }

  @Put(':id/username')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @UseInterceptors(FileInterceptor('file'))
  async modifyUsername(
    @Param() userId: { id: string },
    @Body() data: UsernameDto,
  ): Promise<User> {
    try {
      return await this.usersService.modifyUsername(userId.id, data.username);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('修改用户名失败');
    }
  }
}
