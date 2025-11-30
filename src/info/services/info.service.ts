import { Injectable } from '@nestjs/common';
import { UpdateInfoRequest as IUpdateInfoRequest } from '../interfaces';
import { BaseResponse } from '../../interfaces';
import { UpdateInfoRequest } from '../models';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class InfoService {
  async validateInfo(rawData: IUpdateInfoRequest): Promise<BaseResponse> {
    const data: UpdateInfoRequest = plainToClass(UpdateInfoRequest, rawData);
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
