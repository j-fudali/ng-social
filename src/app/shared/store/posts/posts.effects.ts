import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { PostsActions } from './posts.actions';
import { Post } from '../../interfaces/posts/post';
import { PostsService } from 'src/app/core/services/posts.service';

@Injectable()
export class PostsEffects {
  private postsService = inject(PostsService);
  private actions$ = inject(Actions);
  posts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PostsActions.load),
      concatMap((action) =>
        this.postsService
          .getAllPublicPosts(action.pagination.page, action.pagination.limit)
          .pipe(
            map((res) => PostsActions.loadSuccess({ ...res })),
            catchError((error) => of(PostsActions.loadFailure({ error })))
          )
      )
    );
  });
}
