import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollectionEntity } from './collection.entity';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
// import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [CollectionService, UserService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
