import { Module } from '@nestjs/common';
import { YtsService } from './yts.service';
import { YtsController } from './yts.controller';

@Module({
  providers: [YtsService],
  controllers: [YtsController],
})
export class YtsModule {}
