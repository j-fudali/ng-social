import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { CommentsService } from 'src/app/core/services/comments.service';
import { CommentsAction } from './comments.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../interfaces/error';

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);
  private commentsService = inject(CommentsService);

  public comments = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentsAction.load),
      concatMap((action) =>
        this.commentsService.getCommentsRelatedToPost(action.postId).pipe(
          map((comments) => CommentsAction.loadSuccess({ comments })),
          catchError((err: HttpErrorResponse) =>
            of(CommentsAction.loadFailure({ error: err.error as Error }))
          )
        )
      )
    );
  });
}
