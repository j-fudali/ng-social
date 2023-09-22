import { createReducer, on } from '@ngrx/store';
import { PaginatedResponse } from '../../interfaces/paginated-response';
import { Reaction } from '../../interfaces/reactions/reactions';
import { reactionsActions } from './reactions.action';

export interface ReactionsState {
  reactions: PaginatedResponse<Reaction> | null;
}
export const initialState: ReactionsState = {
  reactions: null,
};
export const reactionsReducer = createReducer(
  initialState,
  on(
    reactionsActions.addReactionToPostSuccess,
    (state, { message, reaction }) => ({
      ...state,
      reactions: {
        result: [...(state.reactions?.result || []), reaction],
        count: (state.reactions?.count || 0) + 1,
      },
    })
  )
);
