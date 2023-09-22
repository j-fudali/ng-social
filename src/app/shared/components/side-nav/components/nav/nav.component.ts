import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private breakpoints = inject(BreakpointObserver);
  @Output() onCloseSidenav = new EventEmitter<void>();
  @Output() onLogout = new EventEmitter<void>();

  links: { name: string; url: string }[] = [
    { name: 'Chats', url: 'chats' },
    { name: 'Groups', url: 'groups' },
  ];

  closeSidenav() {
    if (!this.breakpoints.isMatched('(min-width: 768px)'))
      this.onCloseSidenav.emit();
  }
  logout() {
    this.onLogout.emit();
  }
}
