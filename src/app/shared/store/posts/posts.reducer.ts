import { createReducer, on } from '@ngrx/store';
import { PostsActions } from './posts.actions';
import { Post } from '../../interfaces/posts/post';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Pagination } from '../../interfaces/pagination';
import { pagination, posts } from './posts.selectors';

export interface PostsState extends EntityState<Post> {
  pagination: Pagination;
  loading: boolean;
  selectedImages: { url: string }[] | null;
  selectedPostComments: Comment[] | null;
}
export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  selectId: (e) => e._id,
});
export const { selectAll, selectEntities, selectIds, selectTotal } =
  postAdapter.getSelectors();

export const initialState: PostsState = postAdapter.getInitialState({
  pagination: {
    page: 1,
    limit: 4,
    count: null,
  },
  loading: false,
  selectedImages: null,
  selectedPostComments: null,
});

export const postsReducer = createReducer(
  initialState,
  on(PostsActions.load, PostsActions.searchPublic, (state, action) =>
    action.page && action.page > 1
      ? {
          ...state,
          loading: false,
          pagination: { ...state.pagination, page: action.page },
        }
      : {
          ...state,
          loading: true,
          pagination: { ...state.pagination, page: 1 },
        }
  ),
  on(
    PostsActions.loadSuccess,
    PostsActions.searchPublicSuccess,
    (state, action) => {
      return state.pagination.page == 1
        ? postAdapter.setAll(action.result, {
            ...state,
            loading: false,
            pagination: { ...state.pagination, count: action.count },
          })
        : postAdapter.addMany(action.result, {
            ...state,
            loading: false,
            pagination: {
              ...state.pagination,
              count: action.count,
            },
          });
    }
  ),
  on(PostsActions.addPostSuccess, (state, action) =>
    action.post.visibility === 'public'
      ? postAdapter.setAll([action.post, ...selectAll(state)], {
          ...state,
          pagination: {
            ...state.pagination,
            count: state.pagination.count ? state.pagination.count + 1 : 1,
          },
        })
      : state
  ),

  on(PostsActions.addReactionToSuccess, (state, { postId, reaction }) =>
    postAdapter.updateOne(
      {
        id: postId,
        changes: {
          reactions: [...state.entities[postId]!.reactions, reaction],
        },
      },
      state
    )
  ),
  on(PostsActions.changeReactionToPostSuccess, (state, { postId, reaction }) =>
    postAdapter.updateOne(
      {
        id: postId,
        changes: {
          reactions: state.entities[postId]!.reactions.map((r) =>
            r._id === reaction._id ? reaction : r
          ),
        },
      },
      state
    )
  )
);
