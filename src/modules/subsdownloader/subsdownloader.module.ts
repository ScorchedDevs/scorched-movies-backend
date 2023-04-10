import { Module } from '@nestjs/common';
import { SubsdownloaderService } from './subsdownloader.service';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [SubsdownloaderService],
  exports: [SubsdownloaderService],
})
export class SubsdownloaderModule {}
