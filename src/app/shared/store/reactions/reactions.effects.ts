import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReactionsService } from 'src/app/core/services/reactions.service';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  retry,
} from 'rxjs';
import { PostsActions } from '../posts';

@Injectable()
export class ReactionsEffects {
  private actions$ = inject(Actions);
  private reactionsService = inject(ReactionsService);
  updateReactionToPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.changeReactionToPost),
      debounceTime(500),
      distinctUntilChanged(),
      concatMap(({ postId, reactionId, newReaction }) =>
        this.reactionsService.updateReaction(reactionId, newReaction).pipe(
          map((reaction) =>
            PostsActions.changeReactionToPostSuccess({
              postId,
              reaction,
            })
          ),
          catchError((err) => of(PostsActions.changeReactionToPostFailure(err)))
        )
      )
    );
  });
}
