import { Transform, Type } from 'class-transformer';

export class UpdateInfoRequest {
  name: string;

  @Type(() => Number)
  age: number;

  married?: boolean;

  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;
}
