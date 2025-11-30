import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { NameModule } from './name/name.module';
import { AppController } from './app.controller';

@Module({
  imports: [InfoModule, NameModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
