import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function visibilityValidator(validOptions: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return validOptions.includes(control.value) ? null : { notValid: true };
  };
}
