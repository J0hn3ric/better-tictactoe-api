import { Injectable } from '@nestjs/common';
import { UpdateInfoRequest as IUpdateInfoRequest } from '../interfaces';
import { BaseResponse } from '../../interfaces';
import { RuleEngineService } from './rule-engine.service';
import { UpdateInfoRequest } from '../models';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class InfoService {
  constructor(private readonly ruleEngineService: RuleEngineService) {}

  async validateInfo(rawData: IUpdateInfoRequest): Promise<BaseResponse> {
    const data = plainToInstance(UpdateInfoRequest, rawData, {
      enableImplicitConversion: true,
    });

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
