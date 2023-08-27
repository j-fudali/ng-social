import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { catchError, map, of, throwError } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { PublicUser } from '../interfaces/user/public-user';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

export function usernameValidator(
  userService: UserService,
  toastr: ToastrService
): AsyncValidatorFn {
  return (control: AbstractControl) => {
    return userService.getUserByUsername(control.value).pipe(
      map((user: PublicUser) => {
        return { usernameExists: true };
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
