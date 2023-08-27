import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
import { HeaderComponentActions } from '../../store/header';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() onLogout = new EventEmitter<void>();
  @Output() onOpenSidenav = new EventEmitter<void>();
  @Output() onToggleTheme = new EventEmitter<boolean>();
  @Input() darkMode: boolean = false;

  toggleTheme() {
    this.onToggleTheme.emit(!this.darkMode);
  }
  openNav() {
    this.onOpenSidenav.emit();
  }
  logout() {
    this.onLogout.emit();
  }
}
