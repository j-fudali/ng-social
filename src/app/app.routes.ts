import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { startGuard } from './core/guards/start.guard';

export const routes: Routes = [
  {
    path: 'start',
    loadChildren: () => import('./start/start.routes'),
    canActivate: [startGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes'),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
];
