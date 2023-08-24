import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FriendsListActions } from 'src/app/shared/store/friends-list';
import { PeopleListComponent } from 'src/app/shared/components/people-list/people-list.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';

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
