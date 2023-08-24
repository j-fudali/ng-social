import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavLinkComponent } from './components/nav-link/nav-link.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, NavLinkComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {}
