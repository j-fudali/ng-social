import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';

export interface UserState {
  isLoggedIn: boolean;
  loading: boolean;
}
export const initialState: UserState = {
  isLoggedIn: false,
  loading: false,
};
export const userReducer = createReducer(
  initialState,
  on(UserActions.logIn, UserActions.register, (state) => ({
    isLoggedIn: state.isLoggedIn,
    loading: true,
  })),
  on(UserActions.logInSuccess, UserActions.registerSuccess, (state) => ({
    isLoggedIn: true,
    loading: false,
  })),
  on(UserActions.logInFailure, UserActions.registerFailure, (state) => ({
    isLoggedIn: state.isLoggedIn,
    loading: false,
  }))
);
