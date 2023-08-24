import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginCredentials } from '../../interfaces/login/login-credentials';
import { Error } from '../../interfaces/error';
import { LoginResponse } from '../../interfaces/login/login-response';

export const UserActions = createActionGroup({
  source: 'Auth',
  events: {
    LogIn: props<{ credentials: LoginCredentials }>(),
    LogInSuccess: props<{ loginResponse: LoginResponse }>(),
    LogInFailure: props<{ error: Error }>(),
    Register: props<any>(),
    RegisterSuccess: emptyProps(),
    RegisterFailure: emptyProps(),
    LogOut: emptyProps(),
  },
});
