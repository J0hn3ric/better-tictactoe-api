import { Controller, Post, Body } from '@nestjs/common';
import { NameService } from '../services/name.service';
import { UpdateNameRequest } from '../interfaces';
import { BaseResponse } from '../../interfaces';

@Controller('name')
export class NameController {
  constructor(private readonly nameService: NameService) {}

  @Post('/validate')
  getConfig(@Body() bodyRequest: UpdateNameRequest): Promise<BaseResponse> {
    return this.nameService.validateName(bodyRequest);
  }
}
