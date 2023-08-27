import { createReducer, on } from '@ngrx/store';
import { HeaderComponentActions } from './header.actions';

export interface HeaderComponentState {
  isDark: boolean;
}
export const initialState: HeaderComponentState = {
  isDark: false,
};
export const headerComponentReducer = createReducer(
  initialState,
  on(HeaderComponentActions.dark, (state) => ({ isDark: true })),
  on(HeaderComponentActions.light, (state) => ({ isDark: false }))
);
