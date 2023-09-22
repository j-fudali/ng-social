import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  scan,
  tap,
  exhaustMap,
} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { PostsActions } from './posts.actions';
import { PostsService } from 'src/app/core/services/posts.service';
import { Post } from '../../interfaces/posts/post';
import { ReactionsService } from 'src/app/core/services/reactions.service';

@Injectable()
export class PostsEffects {
  private postsService = inject(PostsService);
  private reactionsService = inject(ReactionsService);
  private actions$ = inject(Actions);
  posts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.load),
      switchMap((action) =>
        this.postsService
          .getAllPublicPosts(action.pagination.page, action.pagination.limit)
          .pipe(
            map((res) => PostsActions.loadSuccess({ ...res })),
            catchError((error) => of(PostsActions.loadFailure({ error })))
          )
      )
    );
  });
  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addPost),
      concatMap((action) =>
        this.postsService.addPost(action.post).pipe(
          map((res) => PostsActions.addPostSuccess({ post: res as Post })),
          catchError((error) => of(PostsActions.addPostFailure({ error })))
        )
      )
    );
  });
  addReactionToPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addReactionToPost),
      concatMap((action) =>
        this.postsService.addReaction(action.postId, action.reaction).pipe(
          map((reaction) =>
            PostsActions.addReactionToSuccess({
              postId: action.postId,
              reaction,
            })
          ),
          catchError((error) =>
            of(PostsActions.addReactionToPostFailure({ error }))
          )
        )
      )
    );
  });
}
