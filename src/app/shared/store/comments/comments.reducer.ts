import { createReducer, on } from '@ngrx/store';
import { CommentsAction } from './comments.actions';
import { Pagination } from '../../interfaces/pagination';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Comment } from '../../interfaces/comments/comment';

export interface CommentsState extends EntityState<Comment> {
  loading: boolean;
  pagination: Pagination;
  selectedPost: string | null;
}
export const commentAdapter: EntityAdapter<Comment> =
  createEntityAdapter<Comment>({
    selectId: (e) => e._id,
  });
export const { selectAll, selectEntities, selectIds, selectTotal } =
  commentAdapter.getSelectors();
export const initialState: CommentsState = commentAdapter.getInitialState({
  loading: false,
  selectedPost: null,
  pagination: {
    page: 1,
    limit: 10,
    count: null,
  },
});
export const commentsReducer = createReducer(
  initialState,
  on(CommentsAction.load, (state, action) =>
    action.page && action.page > 1
      ? {
          ...state,
          loading: false,
          pagination: {
            ...state.pagination,
            page: action.page,
          },
        }
      : {
          ...state,
          loading: true,
          selectedPost: action.postId,
          pagination: { ...state.pagination, page: 1 },
        }
  ),
  on(CommentsAction.loadSuccess, (state, action) =>
    state.pagination.page == 1
      ? commentAdapter.setAll(action.comments, {
          ...state,
          loading: false,
          pagination: { ...state.pagination, count: action.count },
        })
      : commentAdapter.addMany(action.comments, {
          ...state,
          loading: false,
          pagination: { ...state.pagination, count: action.count },
        })
  ),
  on(CommentsAction.addCommentSuccess, (state, action) =>
    commentAdapter.addOne(action.comment, {
      ...state,
      pagination: {
        ...state.pagination,
        count: (state.pagination.count || 0) + 1,
      },
    })
  )
);
