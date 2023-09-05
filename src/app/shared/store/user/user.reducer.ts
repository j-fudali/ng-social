import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export interface UserState {
  isLoggedIn: boolean;
}
export const initialState: UserState = {
  isLoggedIn: false,
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, UserActions.register, (state) => ({
    isLoggedIn: state.isLoggedIn,
  })),
  on(UserActions.logInSuccess, UserActions.registerSuccess, (state) => ({
    isLoggedIn: true,
  })),
  on(UserActions.logInFailure, UserActions.registerFailure, (state) => ({
    isLoggedIn: state.isLoggedIn,
  }))
);
