import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { Store } from '@ngrx/store';
import { isLoading } from './shared/store/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private store = inject(Store);
  loadingSpinner$ = this.store.select(isLoading);
}
