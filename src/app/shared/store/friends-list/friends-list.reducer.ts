import { createReducer, on } from '@ngrx/store';
import { FriendsListActions } from './friends-list.actions';

export interface FriendsListState {
  isOpen: boolean;
}
export const initialState: FriendsListState = {
  isOpen: false,
};
export const friendsListReducer = createReducer(
  initialState,
  on(FriendsListActions.open, (state: FriendsListState) => ({ isOpen: true })),
  on(FriendsListActions.close, (state: FriendsListState) => ({ isOpen: false }))
);
