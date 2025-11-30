import { error } from 'console';
import { UpdateInfoRequest } from 'src/info/interfaces';

export function generateDateOfBirth(age: number): Date {
  const today = new Date();
  const dateOfBirth = new Date(today);
  dateOfBirth.setFullYear(today.getFullYear() - age);

  return dateOfBirth;
}

export const expectedSuccessResponse = (data: UpdateInfoRequest) => {
  return {
    success: true,
    data: data,
  };
};

export const expectedFailResponse = {
  success: false,
  errors: ['mock error message'],
};

export const minNameLength = 5;
export const maxNameLength = 50;

export const minAge = 1;
export const maxAge = 150;
