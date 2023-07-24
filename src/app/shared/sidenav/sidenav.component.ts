import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavLinkComponent } from './components/sidenav-link/sidenav-link.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, SidenavLinkComponent],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {}
