import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordRepeat(group: AbstractControl) {
  const newPassword = group.get('password')?.value;
  const repeatPassword = group.get('repeatPassword')?.value;
  return newPassword === repeatPassword ? null : { notMatch: true };
}
