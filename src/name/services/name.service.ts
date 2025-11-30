import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateNameRequest as UpdateNameRequestInterface } from '../interfaces';
import { BaseResponse } from '../../interfaces';
import { UpdateNameRequest } from '../models';

@Injectable()
export class NameService {
  async validateName(
    rawData: UpdateNameRequestInterface,
  ): Promise<BaseResponse> {
    const data = plainToClass(UpdateNameRequest, rawData);
    const validationErrors = await validate(data);
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
