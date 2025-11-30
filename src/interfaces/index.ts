import { ValidationError } from 'class-validator';
import { RuleEngineError } from 'src/info/services/rule-engine.service';

interface BaseResponseInteface {
  success: boolean;
  data?: any;
  errors?: ValidationError[] | RuleEngineError[];
}

interface BaseResponseSuccess extends BaseResponseInteface {
  success: true;
  data: any;
}

interface BaseResponseValidationError extends BaseResponseInteface {
  success: false;
  errors: ValidationError[];
}

interface BaseResponseRuleEngineError extends BaseResponseInteface {
  success: false;
  errors: RuleEngineError[];
}

export type BaseResponse =
  | BaseResponseSuccess
  | BaseResponseValidationError
  | BaseResponseRuleEngineError;
