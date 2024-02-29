import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FrameEntity } from './frame.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionService } from 'src/collection/collection.service';

@Injectable()
export class FrameService {
  constructor(
    private readonly collectionService: CollectionService,
    @InjectRepository(FrameEntity)
    private frameService: Repository<FrameEntity>,
  ) {}
  async create() {
    // const collection = await this.collectionService.fineOneById(collectionId);
    const frame = new FrameEntity();
    // frame.collection = collection;
    frame.selected_fid = [];
    return this.frameService.save(frame);
  }

  async update(frameId: string, frameData: number[]) {
    const frame = await this.frameService.findOneBy({ id: frameId });
    frame.selected_fid = frameData;
    return this.frameService.save(frame);
  }
}
