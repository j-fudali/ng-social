import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';

export const routes: Routes = [
  { path: 'start', loadChildren: () => import('./start/start.routes') },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
  },
  { path: '', redirectTo: '/start', pathMatch: 'prefix' },
];
