import { UpdateInfoRequest } from '../models';
import { Rule } from './rule';

export class NameRule implements Rule<UpdateInfoRequest> {
  private minNameLen = 5;
  private maxNameLen = 50;

  field: keyof UpdateInfoRequest = 'name';
  message = `length of name must be between ${this.minNameLen} and ${this.maxNameLen}`;

  validate(input: UpdateInfoRequest): boolean {
    return (
      input.name.length >= this.minNameLen &&
      input.name.length <= this.maxNameLen
    );
  }
}

export class AgeRule implements Rule<UpdateInfoRequest> {
  private minAge = 1;
  private maxAge = 150;

  field: keyof UpdateInfoRequest = 'age';
  message = `age must be a number and must be between ${this.minAge} and ${this.maxAge}`;

  validate(input: UpdateInfoRequest): boolean {
    const age = Number(input.age);

    if (isNaN(age)) {
      return false;
    }

    return age >= this.minAge && age <= this.maxAge;
  }
}

export class MarriedRule implements Rule<UpdateInfoRequest> {
  private threshold = 18;

  field: keyof UpdateInfoRequest = 'married';
  message = `married is required if age > ${this.threshold}`;

  validate(input: UpdateInfoRequest): boolean {
    const age = Number(input.age);

    if (age > this.threshold) {
      return input.married !== undefined && typeof input.married === 'boolean';
    }

    return true;
  }
}

export class DateOfBirthRule implements Rule<UpdateInfoRequest> {
  field: keyof UpdateInfoRequest = 'dateOfBirth';
  message = 'date of birth must be valid and coherent with age';

  validate(input: UpdateInfoRequest): boolean {
    const age = Number(input.age);
    const dateOfBirth: Date = input.dateOfBirth;

    if (!(dateOfBirth instanceof Date) || isNaN(dateOfBirth.getTime())) {
      return false;
    }

    const now: Date = new Date();

    const yearDifference: number =
      now.getFullYear() - dateOfBirth.getFullYear();

    return yearDifference === age;
  }
}
