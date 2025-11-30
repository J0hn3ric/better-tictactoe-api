import { Injectable } from '@nestjs/common';
import { UpdateInfoRequest } from '../dtos';
import { BaseResponse } from '../../interfaces';
import { RuleEngineService } from './rule-engine.service';

@Injectable()
export class InfoService {
  constructor(private readonly ruleEngineService: RuleEngineService) {}

  async validateInfo(data: UpdateInfoRequest): Promise<BaseResponse> {
    const validationErrors = this.ruleEngineService.validate(data);
    if (validationErrors.length > 0) {
      return {
        success: false,
        errors: validationErrors,
      };
    }
    return {
      success: true,
      data,
    };
  }
}
