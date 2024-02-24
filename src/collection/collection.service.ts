import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CollectionEntity } from './collection.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CollectionService {
  constructor(
    private readonly usersService: UserService,
    @InjectRepository(CollectionEntity)
    private collectionService: Repository<CollectionEntity>,
  ) {}

  async create(id: string) {
    const user = await this.usersService.findOneById(id);
    const collection = new CollectionEntity();
    collection.owner = user;
    // if (user.collections && Array.isArray(user.collections)) {
    //   user.collections = [...user.collections, collection];
    // } else {
    //   user.collections = [collection];
    // }
    const collectionInfo = await this.collectionService.save(collection);
    // const userInfo = await this.usersService.create(user);
    return { user, collection: collectionInfo };
  }

  async modifyName(collectionId: string, collectionName: string) {
    const collection = await this.collectionService.findOneBy({
      id: collectionId,
    });
    collection.name = collectionName;
    return this.collectionService.save(collection);
  }

  async deleteCollection(collectionId: string) {
    return this.collectionService.delete(collectionId);
  }

  async fineOneById(collectionId: string) {
    return this.collectionService.findOneBy({ id: collectionId });
  }
}
