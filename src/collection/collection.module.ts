import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './collection.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
// import { FrameEntity } from 'src/frame/frame.entity';
// import { FrameService } from 'src/frame/frame.service';
// import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([FrameEntity]),
    TypeOrmModule.forFeature([CollectionEntity]),
    // TypeOrmModule.forFeature([FrameEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    CollectionService,
    // FrameService,
    UserService,
  ],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
