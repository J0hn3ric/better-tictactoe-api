import { Expose, Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import { maxAge, maxNameLen, minAge, minNameLen } from '../utils/constants';
import { DateOfBirthMatchesAge } from '../utils/validator-utils';

export class UpdateInfoRequest {
  @IsString()
  @Length(minNameLen, maxNameLen, {
    message: `length of name must be between ${minNameLen} and ${maxNameLen}`,
  })
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(minAge)
  @Max(maxAge)
  age: number;

  @ValidateIf((o) => o.age > 18)
  @IsBoolean()
  married?: boolean;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @Validate(DateOfBirthMatchesAge)
  dateOfBirth: Date;
}
