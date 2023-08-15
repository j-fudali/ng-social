import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';
import { Store } from '@ngrx/store';
import { FriendsListActions } from 'src/app/shared/store/friends-list';
import { PeopleListComponent } from 'src/app/shared/people-list/people-list.component';

@Component({
  selector: 'app-friends-list',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PeopleListComponent],
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss'],
})
export class FriendsListComponent {
  private store = inject(Store);
  close() {
    this.store.dispatch(FriendsListActions.close());
  }
}
