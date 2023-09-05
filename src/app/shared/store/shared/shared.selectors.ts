import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SharedState } from './shared.reducer';

export const selectSharedState = (state: AppState) => state.shared;

export const showSpinner = createSelector(
  selectSharedState,
  (state: SharedState) => state.showSpinner
);
