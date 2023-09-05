import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of, throwError } from 'rxjs';
import { PublicUser } from '../interfaces/user/public-user';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from 'src/app/core/services/users.service';

export function emailValidator(
  userService: UsersService,
  toastr: ToastrService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.getUserByEmail(control.value).pipe(
      map((user: PublicUser) => {
        return { emailExists: true };
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          return of(null);
        }
        toastr.error('Unknow error');
        return throwError(() => new Error('Unknow error'));
      })
    );
  };
}
