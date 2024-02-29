import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CollectionEntity } from './collection.entity';
import { UserEntity } from 'src/user/user.entity';
import { UpdateCollectionDto } from './dto/updateCollection.dto';

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
    description: '根据ID创建集合',
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
  async create(
    @Param() params: { userId: string },
    @Body() data: CreateCollectionDto,
  ) {
    console.log(data);
    return await this.collectionService.create(params.userId, data);
    // const frame = await this.frameService.create(collection.id);
  }

  @Put(':collectionId/update')
  @HttpCode(200)
  @ApiParam({ name: 'collectionId', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合数据',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CollectionEntity) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async modifyCollection(
    @Param() params: { collectionId: string },
    @Body() data: UpdateCollectionDto,
  ) {
    return await this.collectionService.modifyCollection(
      params.collectionId,
      data,
    );
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

  @Delete(':collectionId/frameList')
  @HttpCode(200)
  @ApiParam({ name: 'collectionId', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        position: { type: 'number' },
      },
    },
  })
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
  async deleteFrameList(
    @Param() params: { collectionId: string },
    @Body() body: { position: number },
  ) {
    return await this.collectionService.deleteFrameList(
      params.collectionId,
      body.position,
    );
  }

  @Post(':collectionId/frame/copy')
  @HttpCode(200)
  @ApiParam({ name: 'collectionId', type: String })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        position: { type: 'number' },
      },
    },
  })
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
  async copyFrameItem(
    @Param() params: { collectionId: string },
    @Body() body: { position: number },
  ) {
    return await this.collectionService.copyFrameItem(
      params.collectionId,
      body.position,
    );
  }

  @Get('list/user/:userId')
  @HttpCode(200)
  @ApiParam({ name: 'userId', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合名称',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CollectionEntity) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async getCollectionList(@Param() params: { userId: string }) {
    return await this.collectionService.getCollectionList(params.userId);
  }

  @Get(':collectionId')
  @HttpCode(200)
  @ApiParam({ name: 'collectionId', type: String })
  @ApiOkResponse({
    status: 'default',
    description: '根据ID修改集合名称',
    schema: {
      type: 'object',
      properties: {
        data: { type: 'object', $ref: getSchemaPath(CollectionEntity) },
        msg: { type: 'string' },
        code: { type: 'number' },
      },
    },
  })
  async getCollectionDetail(@Param() params: { collectionId: string }) {
    const res = await this.collectionService.fineOneById(params.collectionId);
    return {
      ...res,
      frameList: JSON.parse(res.frameList),
    };
  }
}
