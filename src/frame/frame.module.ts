import { Module } from '@nestjs/common';
import { FrameService } from './frame.service';
import { FrameController } from './frame.controller';
import { Frame } from './frame.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Frame])],
  providers: [FrameService],
  controllers: [FrameController],
})
export class FrameModule {}
