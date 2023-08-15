import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { HeaderComponentState } from './header.reducer';

export const selectHeaderComponent = (state: AppState) => state.header;
export const isDark = createSelector(
  selectHeaderComponent,
  (state: HeaderComponentState) => state.isDark
);
