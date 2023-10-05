import { createSelector } from '@ngrx/store';
import { postAdapter, selectAll } from './posts.reducer';
import { AppState } from '../app.state';
export const selectPostsState = (state: AppState) => state.posts;

export const postsState = createSelector(selectPostsState, (state) => state);
export const posts = createSelector(selectPostsState, selectAll);
export const pagination = createSelector(
  selectPostsState,
  (state) => state.pagination
);
export const loading = createSelector(
  selectPostsState,
  (state) => state.loading
);
export const sliderImages = createSelector(
  selectPostsState,
  (state) => state.selectedImages
);
