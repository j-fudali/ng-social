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
import { ToggleDarkModeButtonComponent } from './components/toggle-dark-mode-button/toggle-dark-mode-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    ToggleDarkModeButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() onLogout = new EventEmitter<void>();
  @Output() onOpenSidenav = new EventEmitter<void>();
  @Output() onToggleTheme = new EventEmitter<boolean>();
  @Input() darkMode: boolean = false;

  toggleTheme(darkMode: boolean) {
    this.onToggleTheme.emit(!this.darkMode);
  }
  openNav() {
    this.onOpenSidenav.emit();
  }
  logout() {
    this.onLogout.emit();
  }
}
