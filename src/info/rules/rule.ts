export interface Rule<T> {
  validate(input: T): boolean;
  message: string;
  field: keyof T;
}
