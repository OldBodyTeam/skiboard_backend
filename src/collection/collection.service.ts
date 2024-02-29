import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CollectionEntity } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/createCollection.dto';
import { UpdateCollectionDto } from './dto/updateCollection.dto';
import { cloneDeep } from 'lodash';
@Injectable()
export class CollectionService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(CollectionEntity)
    private collectionService: Repository<CollectionEntity>,
  ) {}

  async create(id: string, data: CreateCollectionDto) {
    const user = await this.usersService.findOneById(id);
    const collection = new CollectionEntity();
    Object.assign(collection, data);
    collection.owner = user;
    const collectionInfo = await this.collectionService.save(data);
    user.collections.push(collectionInfo);
    const userInfo = await this.usersService.create(user);
    return { user: userInfo, collection: collectionInfo };
  }

  async modifyCollection(collectionId: string, data: UpdateCollectionDto) {
    const collection = await this.collectionService.findOneBy({
      id: collectionId,
    });
    console.log(Object.assign(collection, data));
    Object.assign(collection, data);
    return this.collectionService.save(collection);
  }

  async deleteCollection(collectionId: string) {
    return this.collectionService.delete(collectionId);
  }

  async deleteFrameList(collectionId: string, position: number) {
    const collection = await this.collectionService.findOneBy({
      id: collectionId,
    });
    const frameList = JSON.parse(collection.frameList) as any[];
    frameList.splice(position, 1);
    Object.assign(collection, { frameList: JSON.stringify(frameList) });
    return this.collectionService.save(collection);
  }

  async copyFrameItem(collectionId: string, position: number) {
    const collection = await this.collectionService.findOneBy({
      id: collectionId,
    });
    const frameList = JSON.parse(collection.frameList) as any[];
    const item = cloneDeep(frameList[position]);
    item.selected = false;
    frameList.push(item);
    Object.assign(collection, { frameList: JSON.stringify(frameList) });
    return this.collectionService.save(collection);
  }

  async fineOneById(collectionId: string) {
    return this.collectionService.findOneBy({ id: collectionId });
  }
  async getCollectionList(userId: string) {
    const owner = await this.usersService.findOneById(userId);

    return owner.collections.map((v) => {
      console.log(v.frameList);
      return {
        ...v,
        frameList: JSON.parse(v.frameList),
      };
    });
  }
}
