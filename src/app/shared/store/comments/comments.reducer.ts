import { createReducer, on } from '@ngrx/store';
import { Comment } from '../../interfaces/comments/comment';
import { CommentsAction } from './comments.actions';

export interface CommentsState {
  showCommentsComponent: boolean;
  comments: Comment[] | null;
}
export const initialState: CommentsState = {
  showCommentsComponent: false,
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
  on(CommentsAction.loadFailure, (state) => state),
  on(CommentsAction.componentClose, (state) => ({
    ...state,
    showCommentsComponent: false,
  }))
);
