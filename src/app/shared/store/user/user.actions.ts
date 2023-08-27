import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginCredentials } from '../../interfaces/login/login-credentials';
import { Error } from '../../interfaces/error';
import { LoginResponse } from '../../interfaces/login/login-response';
import { SingUpCredentials } from '../../interfaces/sign-up/sing-up-credentials';
import { SignUpResponse } from '../../interfaces/sign-up/sign-up-response';

export const UserActions = createActionGroup({
  source: 'Auth',
  events: {
    LogIn: props<{ credentials: LoginCredentials }>(),
    LogInSuccess: props<{ loginResponse: LoginResponse }>(),
    LogInFailure: props<{ error: Error }>(),
    Register: props<{ credentials: SingUpCredentials }>(),
    RegisterSuccess: props<{ signUpResponse: SignUpResponse }>(),
    RegisterFailure: props<{ error: Error }>(),
    LogOut: emptyProps(),
  },
});
