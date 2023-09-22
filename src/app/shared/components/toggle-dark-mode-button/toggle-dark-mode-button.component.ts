import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  query,
  animate,
  style,
} from '@angular/animations';

@Component({
  selector: 'app-toggle-dark-mode-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-dark-mode-button.component.html',
  styleUrls: ['./toggle-dark-mode-button.component.scss'],
  animations: [
    trigger('parent', [transition(':enter', [])]),
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
export class ToggleDarkModeButtonComponent {
  @Output() onToggleTheme = new EventEmitter<boolean>();
  @Input({ required: true }) darkMode: boolean = false;

  toggleTheme() {
    this.onToggleTheme.emit(!this.darkMode);
  }
}
