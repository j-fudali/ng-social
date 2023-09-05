import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';
import { Post } from '../../interfaces/posts/post';
import { PaginatedResponse } from '../../interfaces/paginated-response';

export interface PostsState {
  posts: PaginatedResponse<Post> | null;
  selectedImages: { url: string }[] | null;
  selectedPostComments: Comment[] | null;
}

export const initialState: PostsState = {
  posts: null,
  selectedImages: null,
  selectedPostComments: null,
};

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.load, (state) => state),
  on(PostsActions.loadSuccess, (state, action) => ({
    ...state,
    posts: action,
  })),
  on(PostsActions.loadFailure, (state, action) => state),
  on(PostsActions.setImages, (state, action) => ({
    ...state,
    selectedImages: action.images,
  }))
);
