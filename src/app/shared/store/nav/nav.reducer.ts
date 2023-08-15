import { createReducer, on } from '@ngrx/store';
import { NavComponentActions } from './nav.actions';

export interface NavState {
  isOpen: boolean;
}
export const initialState: NavState = {
  isOpen: false,
};
export const navReducer = createReducer(
  initialState,
  on(NavComponentActions.open, (state) => ({ isOpen: true })),
  on(NavComponentActions.close, (state) => ({ isOpen: false }))
);
