import { createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';
import { AppState } from '../app.state';
export const selectPostsState = (state: AppState) => state.posts;
export const posts = createSelector(
  selectPostsState,
  (state: PostsState) => state.posts
);
export const sliderImages = createSelector(
  selectPostsState,
  (state) => state.selectedImages
);
