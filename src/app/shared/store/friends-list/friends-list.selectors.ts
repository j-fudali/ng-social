import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { FriendsListState } from './friends-list.reducer';

export const selectFriendsList = (state: AppState) => state.friendsList;
export const isFriendsListOpen = createSelector(
  selectFriendsList,
  (state: FriendsListState) => state.isOpen
);
