import { createFeature, createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';
import { Post } from '../../interfaces/posts/post';
import { PaginatedResponse } from '../../interfaces/paginated-response';
import { EntityState } from '@ngrx/entity';

export interface PostsState extends EntityState<Post>{
  page: number | null;
  count: number | null;
  selectedImages: { url: string }[] | null;
  selectedPostComments: Comment[] | null;
}

export const initialState: PostsState = {
  selectedImages: null,
  selectedPostComments: null,
};

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.loadSuccess, (state, action) => ({
    ...state,
    posts: {
      ...state.posts,
      result: state.posts?.result
        ? [...state.posts.result, ...action.result]
        : [...action.result],
      count: action.count,
    },
  })),
  on(PostsActions.addPostSuccess, (state, action) => ({
    ...state,
    posts: {
      result: state.posts?.result
        ? [...state.posts.result, action.post]
        : [action.post],
      count: state.posts?.count ? state.posts.count + 1 : 1,
    },
  })),
  on(PostsActions.setImages, (state, action) => ({
    ...state,
    selectedImages: action.images,
  })),
  on(PostsActions.addReactionToSuccess, (state, { postId, reaction }) => ({
    ...state,
    posts: {
      result: state.posts!.result.map((p) =>
        p._id === postId
          ? {
              ...p,
              reactions: [...p.reactions, reaction],
            }
          : p
      ),
      count: state.posts!.count,
    },
  })),
  on(PostsActions.changeReactionToPost, (state, {postId, reaction}) => ({

  })),
  on(PostsActions.changeReactionToPostSuccess, (state, {postId, reaction}) => ({
    ...state,
    posts: {
      result: state.posts!.result.map( p => p._id === postId ? {...p. reactions: p.reactions.map(r => r.author._id === userId)}),
      count: state.posts!.count
    }
  }))
);
