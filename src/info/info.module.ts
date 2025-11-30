import { Module } from '@nestjs/common';
import { InfoController } from './controllers/info.controller';
import { InfoService } from './services/info.service';
import { InfoRuleProvider } from './rules/rule-injectable';
import { RuleEngineService } from './services/rule-engine.service';

@Module({
  imports: [],
  controllers: [InfoController],
  providers: [InfoService, InfoRuleProvider, RuleEngineService],
})
export class InfoModule {}
