import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ReportType } from '../data';

@ValidatorConstraint({ name: 'isValidReportType', async: false })
export class IsValidReportTypeConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return Object.values(ReportType).includes(value);
  }
}

export function IsValidReportType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidReportTypeConstraint,
    });
  };
}
