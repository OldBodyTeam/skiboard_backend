import { Module } from '@nestjs/common';
import { FrameService } from './frame.service';
import { FrameController } from './frame.controller';
import { FrameEntity } from './frame.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionService } from 'src/collection/collection.service';
import { CollectionEntity } from 'src/collection/collection.entity';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FrameEntity]),
    TypeOrmModule.forFeature([CollectionEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [FrameService, CollectionService, UserService],
  controllers: [FrameController],
  exports: [FrameService],
})
export class FrameModule {}
