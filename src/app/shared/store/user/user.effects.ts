import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserActions } from './user.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { LoginResponse } from '../../interfaces/login/login-response';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Error } from '../../interfaces/error';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedActions } from '../shared/shared.actions';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private cookiesService = inject(CookieService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  public login = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logIn),
      concatMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((res: LoginResponse) =>
            UserActions.logInSuccess({ loginResponse: res })
          ),
          catchError((errorRes: HttpErrorResponse) => {
            const error = errorRes.error as Error;
            return of(UserActions.logInFailure({ error }));
          })
        )
      )
    );
  });

  public loginSuccess = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logInSuccess),
      tap(({ loginResponse }) => {
        this.cookiesService.set('token', loginResponse.access_token);
        this.router.navigate(['/home']);
      }),
      map(() => SharedActions.hideSpinner())
    );
  });
  logInAndSignUpFailure = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.logInFailure, UserActions.registerFailure),
      tap(({ error }) => {
        const message = this.authService.getErrorMessage(error.statusCode);
        this.toastr.error(message);
      }),
      map(() => SharedActions.hideSpinner())
    );
  });
  register = createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(UserActions.register),
        concatMap((action) =>
          authService
            .register(action.credentials)
            .pipe(
              map((res) => UserActions.registerSuccess({ signUpResponse: res }))
            )
        ),
        catchError((err: HttpErrorResponse) => {
          const error = err.error as Error;
          return of(UserActions.registerFailure({ error }));
        })
      );
    }
  );
  registerSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        tap(({ signUpResponse }) => {
          this.cookiesService.set('token', signUpResponse.access_token);
          this.router.navigate(['/home']);
          this.toastr.success(signUpResponse.message);
        })
      );
    },
    { dispatch: false }
  );
  logOut = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.logOut),
        tap(() => {
          this.cookiesService.delete('token');
          this.router.navigate(['/start']);
        })
      );
    },
    { dispatch: false }
  );
}
