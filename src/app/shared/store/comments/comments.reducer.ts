import { createReducer, on } from '@ngrx/store';
import { Comment } from '../../interfaces/comments/comment';
import { CommentsAction } from './comments.actions';

export interface CommentsState {
  comments: Comment[] | null;
}
export const initialState: CommentsState = {
  comments: null,
};
export const commentsReducer = createReducer(
  initialState,
  on(CommentsAction.load, (state, action) => ({
    ...state,
    comments: null,
  })),
  on(CommentsAction.loadSuccess, (state, action) => ({
    comments: action.comments,
    showCommentsComponent: true,
  })),
  on(CommentsAction.loadFailure, (state) => state)
);
