import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
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
  Get,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import OSS from 'ali-oss';
import { Injectable } from '@nestjs/common';
import { UserAvatarDto } from './dto/user-avatar.dto';
import { UsernameDto } from './dto/username.dto';
import { UserEntity } from './user.entity';
@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@Injectable()
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @Post()
  @HttpCode(200)
  async create(@Body() user: UserEntity) {
    return await this.usersService.create(user);
  }
  // https://stackoverflow.com/questions/66605192/file-uploading-along-with-other-data-in-swagger-nestjs
  @Post(':id/avatar')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiExtraModels(CreateUserDto)
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改用户头像',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CreateUserDto) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
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
    file: Express.Multer.File,
  ) {
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
      console.log(avatarUrlInfo);
      // 修改
      return await this.usersService.modifyAvatar(userId.id, avatarUrlInfo.url);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('阿里云文件上传失败, 更新头像失败');
    }
  }

  @Put(':id/username')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiExtraModels(CreateUserDto)
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改用户名',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CreateUserDto) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async modifyUsername(
    @Param() userId: { id: string },
    @Body() data: UsernameDto,
  ): Promise<UserEntity> {
    try {
      return await this.usersService.modifyUsername(userId.id, data.username);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('修改用户名失败');
    }
  }

  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiExtraModels(CreateUserDto)
  @ApiOkResponse({
    status: 'default',
    description: '根据id获取用户信息',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CreateUserDto) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async user(@Param() userId: { id: string }) {
    try {
      return await this.usersService.findOneById(userId.id);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('获取用户信息失败');
    }
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID删除用户',
    schema: {
      type: 'object',
      properties: {
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async deleteUser(@Param() userId: { id: string }) {
    try {
      await this.usersService.delete(userId.id);
      return { msg: '用户删除成功', code: 200 };
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException('用户删除失败');
    }
  }
}
