import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CollectionDto } from './dto/collection.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CollectionEntity } from './collection.entity';
import { UserEntity } from 'src/user/user.entity';

@ApiBearerAuth()
@ApiTags('collection')
@Controller('collection')
@Injectable()
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post(':userId/collection/create')
  @HttpCode(200)
  @ApiParam({ name: 'userId', type: String })
  @ApiExtraModels(CreateUserDto)
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合名称',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            collection: { $ref: getSchemaPath(CollectionEntity) },
            userInfo: { $ref: getSchemaPath(UserEntity) },
          },
        },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async create(@Param() params: { userId: string }) {
    return await this.collectionService.create(params.userId);
  }

  @Put(':userId/collection/:collectionId/update')
  @HttpCode(200)
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合名称',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CollectionDto) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async modifyName(
    @Param() params: { userId: string },
    @Body() data: CollectionDto,
  ) {
    return await this.collectionService.modifyName(params.userId, data.name);
  }

  @Delete(':collectionId/delete')
  @HttpCode(200)
  @ApiParam({ name: 'collectionId', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合名称',
    schema: {
      type: 'object',
      properties: {
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async deleteCollection(@Param() params: { collectionId: string }) {
    return await this.collectionService.deleteCollection(params.collectionId);
  }
}
