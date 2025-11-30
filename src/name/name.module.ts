import { Module } from '@nestjs/common';
import { NameController } from './controllers/name.controller';
import { NameService } from './services/name.service';

@Module({
  imports: [],
  controllers: [NameController],
  providers: [NameService],
})
export class NameModule {}
