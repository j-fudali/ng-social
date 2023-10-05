import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs';
import { UserActions } from '../user';
import { SharedActions } from './shared.actions';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { PostsActions } from '../posts';

@Injectable()
export class SharedEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private toastr = inject(ToastrService);
  failures$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        UserActions.logInFailure,
        UserActions.registerFailure,
        PostsActions.loadFailure,
        PostsActions.addPostFailure,
        PostsActions.addReactionToPostFailure,
        PostsActions.changeReactionToPostFailure,
        PostsActions.searchPublicFailure
      ),
      tap(({ error }) => {
        const message = this.authService.getErrorMessage(error.statusCode);
        this.toastr.error(message);
      }),
      map(() => SharedActions.hideSpinner())
    );
  });
  notifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SharedActions.setNotification),
        tap(({ message, mode }) =>
          mode === 'success'
            ? this.toastr.success(message)
            : this.toastr.info(message)
        )
      ),
    { dispatch: false }
  );
}
