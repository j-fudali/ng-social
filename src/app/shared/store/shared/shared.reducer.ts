import { createReducer, on } from '@ngrx/store';
import { SharedActions } from './shared.actions';

export interface SharedState {
  showSpinner: boolean;
  notification: {
    message: string | null;
    mode: string | null;
  };
}
export const initialState: SharedState = {
  showSpinner: false,
  notification: { message: null, mode: null },
};
export const sharedReducer = createReducer(
  initialState,
  on(SharedActions.showSpinner, (state) => ({
    ...state,
    showSpinner: true,
  })),
  on(SharedActions.hideSpinner, (state) => ({ ...state, showSpinner: false })),
  on(SharedActions.setNotification, (state, action) => ({
    ...state,
    error: { message: action.message, mode: action.mode },
  }))
);
