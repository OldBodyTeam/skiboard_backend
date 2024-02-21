import { Controller, HttpCode, Injectable, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { CollectionService } from './collection.service';

@ApiBearerAuth()
@ApiTags('collection')
@Controller('collection')
@Injectable()
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post(':id/create')
  @HttpCode(200)
  @ApiParam({ name: 'id', type: String })
  async create(@Param() userId: { id: string }) {
    return await this.collectionService.create(userId.id);
  }
}
