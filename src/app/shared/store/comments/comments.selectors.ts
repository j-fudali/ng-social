import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommentsState, selectAll } from './comments.reducer';

export const selectCommentsState = (state: AppState) => state.comments;
export const comments = createSelector(selectCommentsState, selectAll);
export const commentsPagination = createSelector(
  selectCommentsState,
  (state) => state.pagination
);
export const loading = createSelector(
  selectCommentsState,
  (state) => state.loading
);
export const selectedPost = createSelector(
  selectCommentsState,
  (state) => state.selectedPost
);
export const selectComments = createSelector(
  comments,
  commentsPagination,
  loading,
  (comments, pagination, loading) => ({
    comments,
    pagination,
    loading,
  })
);
