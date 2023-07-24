import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './home/pages/posts/posts.component';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [{ path: '', component: PostsComponent }],
  },
];
