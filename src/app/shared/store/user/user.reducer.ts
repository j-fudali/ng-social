import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export interface UserState {
  isLoggedIn: boolean;
  user: any; //User
  errorMessage: string | null;
}
export const initialState: UserState = {
  isLoggedIn: false,
  user: null,
  errorMessage: null,
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, (state) => state)
);
