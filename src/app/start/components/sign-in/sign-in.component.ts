import { Component, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { FormErrorComponent } from 'src/app/shared/components/form-error/form-error.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginCredentials } from 'src/app/shared/interfaces/login/login-credentials';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginResponse } from 'src/app/shared/interfaces/login/login-response';

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
export class SignInComponent implements OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private cookies = inject(CookieService);
  private sub!: Subscription;
  loginForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    // password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]]
  });
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  submit() {
    if (
      this.loginForm.valid &&
      this.loginForm.dirty &&
      this.username &&
      this.password
    ) {
      const loginCredentials: LoginCredentials = {
        username: this.username.value,
        password: this.password.value,
      };
      this.sub = this.authService
        .login(loginCredentials)
        .subscribe((res: LoginResponse) => {
          this.cookies.set(
            'token',
            res.access_token,
            new Date(new Date().getHours() + 1)
          );
          this.router.navigate(['/home']);
        });
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
