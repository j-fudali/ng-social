import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import { SingUpCredentials } from 'src/app/shared/interfaces/sign-up/sing-up-credentials';
import { FormErrorComponent } from 'src/app/shared/components/form-error/form-error.component';
import { usernameValidator } from 'src/app/shared/validators/username.validator';
import { UserService } from 'src/app/core/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { emailValidator } from 'src/app/shared/validators/email.validator';
import { passwordRepeat } from 'src/app/shared/validators/password-repeat.validator';
import { UserActions } from 'src/app/shared/store/user';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToggleButtonComponent,
    FormErrorComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastr = inject(ToastrService);
  signUpForm: FormGroup;
  maxDatepickerValue = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10);
  ngOnInit(): void {
    this.signUpForm = this.fb.nonNullable.group(
      {
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [emailValidator(this.userService, this.toastr)],
            updateOn: 'blur',
          },
        ],
        username: [
          '',
          {
            validators: [Validators.required],
            asyncValidators: [usernameValidator(this.userService, this.toastr)],
            updateOn: 'blur',
          },
        ],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        birthdate: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(9),
            Validators.pattern(/^\d{9}$/),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            ),
          ],
        ],
        repeatPassword: ['', Validators.required],
        visibility: [true],
      },
      { validators: passwordRepeat }
    );
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get username() {
    return this.signUpForm.get('username');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get birthdate() {
    return this.signUpForm.get('birthdate');
  }
  get phone() {
    return this.signUpForm.get('phone');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get repeatPassword() {
    return this.signUpForm.get('repeatPassword');
  }
  get visibility() {
    return this.signUpForm.get('visibility');
  }
  signUp() {
    if (this.signUpForm.valid && this.signUpForm.dirty) {
      delete this.signUpForm.value.repeatPassword;
      const credentials: SingUpCredentials = {
        email: this.email?.value,
        username: this.username?.value,
        firstname: this.firstname?.value,
        lastname: this.lastname?.value,
        birthdate: new DatePipe('en-US').transform(
          this.birthdate?.value,
          'dd.MM.yyyy'
        )!,
        phone: this.phone?.value,
        password: this.password?.value,
        isVisible: this.visibility?.value,
      };
      console.log(credentials);
      this.store.dispatch(UserActions.register({ credentials }));
    }
  }
}
