import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, withLatestFrom } from 'rxjs';
import { CommentsService } from 'src/app/core/services/comments.service';
import { CommentsAction } from './comments.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Error } from '../../interfaces/error';
import { Store } from '@ngrx/store';
import { selectedPost } from './comments.selectors';

@Injectable()
export class CommentsEffects {
  private actions$ = inject(Actions);
  private commentsService = inject(CommentsService);
  private store = inject(Store);
  public comments = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentsAction.load),
      concatMap((action) =>
        this.commentsService.getCommentsRelatedToPost(action.postId).pipe(
          map(({ result, count }) =>
            CommentsAction.loadSuccess({
              comments: result,
              count,
            })
          ),
          catchError((err: HttpErrorResponse) =>
            of(CommentsAction.loadFailure({ error: err.error as Error }))
          )
        )
      )
    );
  });
  public addComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(CommentsAction.addComment),
      withLatestFrom(this.store.select(selectedPost)),
      concatMap(([action, postId]) =>
        this.commentsService
          .addComment(action.message, postId!, action.image)
          .pipe(
            map((comment) => CommentsAction.addCommentSuccess({ comment })),
            catchError((error) =>
              of(CommentsAction.addCommentFailure({ error }))
            )
          )
      )
    );
  });
}
