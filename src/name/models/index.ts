import { UpdateNameRequest as UpdateNameRequestInterface } from '../interfaces';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateNameRequest implements UpdateNameRequestInterface {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
