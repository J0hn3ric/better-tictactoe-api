import { Module } from '@nestjs/common';
import { InfoController } from './controllers/info.controller';
import { InfoService } from './services/info.service';

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
