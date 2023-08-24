import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
  },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];
