import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
        }),
        animate(
          '150ms ease-out',
          style({
            transform: 'translateX(0)',
          })
        ),
      ]),
      transition(
        ':leave',
        animate(
          '150ms ease-out',
          style({
            transform: 'translateX(100%)',
          })
        )
      ),
    ]),
  ],
})
export class FriendsListComponent {
  opened: boolean = false;
  toggle() {
    this.opened = !this.opened;
  }
}
