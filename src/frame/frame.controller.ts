import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FrameService } from './frame.service';

@ApiBearerAuth()
@ApiTags('frame')
@Controller('frame')
export class FrameController {
  constructor(private readonly frameService: FrameService) {}
}
