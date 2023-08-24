import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserActions } from './user.actions';
import { catchError, concatMap, exhaustMap, map, of, tap } from 'rxjs';
import { LoginCredentials } from '../../interfaces/login/login-credentials';
import { LoginResponse } from '../../interfaces/login/login-response';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Error } from '../../interfaces/error';

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(UserActions.logIn),
      concatMap((action) =>
        authService.login(action.credentials).pipe(
          map((res: LoginResponse) =>
            UserActions.logInSuccess({ loginResponse: res })
          ),
          catchError((error: Error) => of(UserActions.logInFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const loginSuccess = createEffect(
  (
    actions$ = inject(Actions),
    cookiesService = inject(CookieService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(UserActions.logInSuccess),
      tap(({ loginResponse }) => {
        cookiesService.set('token', loginResponse.access_token);
        router.navigate(['/home']);
      })
    );
  },
  {functional: true, dispatch: false}
);
export const logInFailure = createEffect((actions$ = inject(Actions)) => {
    ofType(UserActions.logInFailure),

});
