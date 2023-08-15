import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavComponent } from '../nav/nav.component';
import { Store } from '@ngrx/store';
import { NavComponentActions } from '../store/nav';
import { HeaderComponentActions } from '../store/header';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NavComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('preventInitialAnimationRun', [
      transition(':enter', [query(':enter', [], { optional: true })]),
    ]),
    trigger('rotate', [
      transition(
        ':enter',
        query('svg', [
          animate('150ms ease-in-out', style({ transform: 'rotate(-360deg)' })),
        ])
      ),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  private store = inject(Store);
  isDark: boolean = false;
  toggleTheme() {
    this.isDark = !this.isDark;
    this.store.dispatch(
      this.isDark
        ? HeaderComponentActions.dark()
        : HeaderComponentActions.white()
    );
    localStorage.setItem('darkMode', this.isDark ? 'true' : 'false');
  }
  openNav() {
    this.store.dispatch(NavComponentActions.open());
  }
  ngOnInit(): void {
    localStorage.getItem('darkMode') === 'true'
      ? (this.isDark = true)
      : (this.isDark = false);
  }
}
