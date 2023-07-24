import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlComponent } from 'src/app/shared/form-control/form-control.component';
import { FormErrorComponent } from 'src/app/shared/form-error/form-error.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormControlComponent, FormErrorComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {}
