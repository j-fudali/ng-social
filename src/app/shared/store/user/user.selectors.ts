import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducer';

export const selectUser = (state: AppState) => state.user;

export const isLoggedIn = createSelector(
  selectUser,
  (state: UserState) => state.isLoggedIn
);
export const isLoading = createSelector(
  selectUser,
  (state: UserState) => state.loading
);
