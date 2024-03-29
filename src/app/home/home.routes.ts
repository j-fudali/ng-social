import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Route,
  RouterStateSnapshot,
} from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { HomeComponent } from './home.component';
import { GroupComponent } from './pages/groups/pages/group/group.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatComponent } from './pages/chats/pages/chat/chat.component';
import { NoChatSelectedComponent } from './pages/chats/pages/no-chat-selected/no-chat-selected.component';
import { SearchComponent } from './pages/posts/pages/search/search.component';

export default [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PostsComponent,
        children: [{ path: 'search', component: SearchComponent }],
      },
      {
        path: 'groups',
        component: GroupsComponent,
      },
      { path: 'groups/:id', component: GroupComponent },
      {
        path: 'chats',
        component: ChatsComponent,
        children: [
          {
            path: '',
            component: NoChatSelectedComponent,
          },
          {
            path: ':id',
            component: ChatComponent,
          },
        ],
      },
    ],
  },
] as Route[];
