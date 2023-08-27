import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { FormErrorComponent } from 'src/app/shared/components/form-error/form-error.component';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/interfaces/login/login-credentials';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from 'src/app/shared/interfaces/login/login-response';
import { Store } from '@ngrx/store';
import { UserActions } from 'src/app/shared/store/user';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    FormErrorComponent,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  loginForm: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      const credentials: LoginCredentials = this.loginForm.value;
      this.store.dispatch(UserActions.logIn({ credentials }));
    }
  }
}
