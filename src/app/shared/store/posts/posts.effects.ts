import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  mergeMap,
  tap,
  distinctUntilChanged,
  debounceTime,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsActions } from './posts.actions';
import { PostsService } from 'src/app/core/services/posts.service';
import { SharedActions } from '../shared/shared.actions';
import { Store } from '@ngrx/store';
import { pagination } from './posts.selectors';

@Injectable()
export class PostsEffects {
  private postsService = inject(PostsService);
  private actions$ = inject(Actions);
  private store = inject(Store);
  postsLoad$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.load),
      withLatestFrom(this.store.select(pagination)),
      switchMap(([action, state]) =>
        this.postsService.getAllPublicPosts(action.page, state.limit).pipe(
          map((res) => PostsActions.loadSuccess(res)),
          catchError((error) => of(PostsActions.loadFailure({ error })))
        )
      )
    );
  });

  addPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addPost),
      concatMap((action) => {
        return this.postsService.addPost(action.post).pipe(
          map((post) => PostsActions.addPostSuccess({ post })),
          catchError((error) => of(PostsActions.addPostFailure({ error })))
        );
      })
    );
  });
  addPostSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addPostSuccess),
      mergeMap(() => [
        SharedActions.hideSpinner(),
        SharedActions.setNotification({
          message: 'Post added!',
          mode: 'success',
        }),
      ])
    );
  });
  addReactionToPost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.addReactionToPost),
      debounceTime(500),
      distinctUntilChanged(),
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
  searchPublic$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.searchPublic),
      withLatestFrom(this.store.select(pagination)),
      switchMap(([action, state]) =>
        this.postsService
          .searchPosts(action.page, state.limit, action.search, 'public')
          .pipe(
            map((res) => PostsActions.searchPublicSuccess(res)),
            catchError((err) => of(PostsActions.searchPublicFailure(err)))
          )
      )
    );
  });
}
