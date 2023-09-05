import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommentsState } from './comments.reducer';

export const selectCommentsState = (state: AppState) => state.comments;
export const comments = createSelector(
  selectCommentsState,
  (state: CommentsState) => state.comments
);
export const showCommentsComponent = createSelector(
  selectCommentsState,
  (state) => state.showCommentsComponent
);
