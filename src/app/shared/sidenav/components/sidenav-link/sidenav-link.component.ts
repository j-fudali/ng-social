import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav-link.component.html',
  styleUrls: ['./sidenav-link.component.scss'],
})
export class SidenavLinkComponent {
  @Input({ required: true }) name: string = '';
  @Input({ required: true }) link: string = '';
}
