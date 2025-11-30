import { Inject, Injectable } from '@nestjs/common';
import { UpdateInfoRequest } from '../interfaces';
import { Rule } from '../rules/rule';
import { INFO_RULES } from '../rules/rule-injectable';

export interface RuleEngineError {
  field: string;
  message: string;
}

@Injectable()
export class RuleEngineService {
  constructor(
    @Inject(INFO_RULES)
    private readonly rules: Rule<UpdateInfoRequest>[],
  ) {}

  validate(data: UpdateInfoRequest): RuleEngineError[] {
    const errors: RuleEngineError[] = [];
    const errorRules = this.rules.filter((r) => !r.validate(data));

    for (const e of errorRules) {
      errors.push({ field: e.field, message: e.message });
    }

    return errors;
  }
}
