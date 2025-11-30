export interface UpdateInfoRequest {
  name: string;
  age: number | string;
  married?: boolean;
  dateOfBirth: Date;
}
