import { Provider } from '@nestjs/common';
import { AgeRule, DateOfBirthRule, MarriedRule, NameRule } from './info-rules';

export const INFO_RULES = 'INFO_RULES';

export const InfoRuleProvider: Provider = {
  provide: INFO_RULES,
  useFactory: () => [
    new NameRule(),
    new AgeRule(),
    new MarriedRule(),
    new DateOfBirthRule(),
  ],
};
