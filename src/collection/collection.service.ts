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
    user.collections.push(collection);
    const userInfo = await this.usersService.create(user);
    return { userInfo, collection };
  }

  async modifyName(collectionId: string) {
    const user = await this.collectionService.findOneBy({ id: collectionId });
    this.collectionService.save(user);
  }
}
