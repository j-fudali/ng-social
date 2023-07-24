import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('toggleTheme', [
      transition(
        'true => false',
        animate(
          '150ms ease-in-out',
          style({
            transform: 'rotate(-360deg) scale(75%)',
          })
        )
      ),
      transition(
        'false => true',
        animate(
          '150ms ease-in-out',
          style({
            transform: 'rotate(-360deg) scale(75%)',
          })
        )
      ),
    ]),
  ],
})
export class HeaderComponent {
  isDay: boolean = true;
  toggleTheme() {
    this.isDay = !this.isDay;
  }
}
