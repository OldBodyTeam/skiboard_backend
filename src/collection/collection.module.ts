import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Collection])],
  providers: [CollectionService],
  controllers: [CollectionController],
})
export class CollectionModule {}
