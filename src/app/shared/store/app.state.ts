import { FriendsListState } from './friends-list';
import { HeaderComponentState } from './header/header.reducer';
import { NavState } from './nav';

export interface AppState {
  nav: NavState;
  header: HeaderComponentState;
  friendsList: FriendsListState;
}
