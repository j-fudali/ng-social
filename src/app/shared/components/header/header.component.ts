import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../nav/nav.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ToggleDarkModeButtonComponent } from '../toggle-dark-mode-button/toggle-dark-mode-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FiltersComponent } from './components/filters/filters.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavComponent,
    SearchBarComponent,
    ToggleDarkModeButtonComponent,
    NavComponent,
    OverlayModule,
    FiltersComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input({ required: true }) darkMode: boolean;
  @Output() onOpenSidenav = new EventEmitter<void>();
  @Output() onToggleTheme = new EventEmitter<boolean>();
  @Output() onSearch = new EventEmitter<string>();
  @Output() onResetSearch = new EventEmitter<void>();
  @Output() onOpenFiltersOverlay = new EventEmitter<boolean>();
  @Output() onLogout = new EventEmitter<void>();
  isFiltersOverlayOpen: boolean = false;
  toggleTheme(isDark: boolean) {
    this.onToggleTheme.emit(isDark);
  }
  openNav() {
    this.onOpenSidenav.emit();
  }
  toggleFiltersOverlay() {
    this.isFiltersOverlayOpen = !this.isFiltersOverlayOpen;
  }
  search(searchedText: string) {
    this.onSearch.emit(searchedText);
  }
  reset() {
    this.onResetSearch.emit();
  }
  logout() {
    this.onLogout.emit();
  }
}
