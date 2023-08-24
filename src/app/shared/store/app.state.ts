import { ChatsState } from './chats';
import { FriendsListState } from './friends-list';
import { HeaderComponentState } from './header/header.reducer';
import { NavState } from './nav';
import { UserState } from './user';

export interface AppState {
  user: UserState;
  nav: NavState;
  header: HeaderComponentState;
  friendsList: FriendsListState;
  chatsList: ChatsState;
}
