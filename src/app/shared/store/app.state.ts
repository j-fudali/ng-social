import { ChatsState } from './chats';
import { CommentsState } from './comments/comments.reducer';
import { FriendsListState } from './friends-list';
import { HeaderComponentState } from './header/header.reducer';
import { NavState } from './nav';
import { PostsState } from './posts/posts.reducer';
import { SharedState } from './shared/shared.reducer';
import { UserState } from './user';

export interface AppState {
  user: UserState;
  nav: NavState;
  header: HeaderComponentState;
  friendsList: FriendsListState;
  chatsList: ChatsState;
  posts: PostsState;
  shared: SharedState;
  comments: CommentsState;
}
