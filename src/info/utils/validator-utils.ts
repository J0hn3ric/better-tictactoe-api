import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UpdateInfoRequest } from '../interfaces';

@ValidatorConstraint({ name: 'DateOgBirthMatchesAge', async: false })
export class DateOfBirthMatchesAge implements ValidatorConstraintInterface {
  validate(
    dateOfBirth: Date,
    validationArguments?: ValidationArguments,
  ): boolean {
    const obj = validationArguments.object as UpdateInfoRequest;
    const age = Number(obj.age);

    const now: Date = new Date();

    if (
      !dateOfBirth ||
      !(dateOfBirth instanceof Date) ||
      isNaN(dateOfBirth.getTime())
    ) {
      return false;
    }

    const yearDiff: number = now.getFullYear() - dateOfBirth.getFullYear();

    return yearDiff === age;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'date of birth must be valid and coherent with age';
  }
}
