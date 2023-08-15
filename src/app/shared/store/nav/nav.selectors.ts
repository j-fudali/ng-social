import { createSelector } from '@ngrx/store';
import { NavState } from './nav.reducer';
import { AppState } from '../app.state';

export const selectNav = (state: AppState) => state.nav;
export const isOpen = createSelector(
  selectNav,
  (state: NavState) => state.isOpen
);
