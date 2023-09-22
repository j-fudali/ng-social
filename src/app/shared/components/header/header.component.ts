import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../side-nav/components/nav/nav.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ToggleDarkModeButtonComponent } from '../toggle-dark-mode-button/toggle-dark-mode-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    SearchBarComponent,
    ToggleDarkModeButtonComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) darkMode: boolean;
  @Output() onOpenSidenav = new EventEmitter<void>();
  @Output() onToggleTheme = new EventEmitter<boolean>();

  toggleTheme(isDark: boolean) {
    this.onToggleTheme.emit(isDark);
  }
  openNav() {
    this.onOpenSidenav.emit();
  }
}
