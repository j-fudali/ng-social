import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { NavComponent } from '../shared/nav/nav.component';
import { Store } from '@ngrx/store';
import { isOpen } from '../shared/store/nav';
import { SideNavComponent } from '../shared/side-nav/side-nav.component';
import { HeaderComponentActions, isDark } from '../shared/store/header';
import {
  FriendsListActions,
  isFriendsListOpen,
} from '../shared/store/friends-list';
import { trigger, transition, style, animate } from '@angular/animations';
import { FriendsListComponent } from './components/friends-list/friends-list.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FriendsListComponent,
    SideNavComponent,
    NavComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({
          transform: 'translateX(100%)',
        }),
        animate(
          '200ms ease-out',
          style({
            transform: 'translateX(0)',
          })
        ),
      ]),
      transition(
        ':leave',
        animate(
          '200ms ease-in',
          style({
            transform: 'translateX(100%)',
          })
        )
      ),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  private store = inject(Store);
  opened: boolean = false;
  isSidenavOpen$ = this.store.select(isOpen);
  isDark$ = this.store.select(isDark);
  isFriendsListOpen$ = this.store.select(isFriendsListOpen);
  ngOnInit(): void {
    this.store.dispatch(
      localStorage.getItem('darkMode') === 'true'
        ? HeaderComponentActions.dark()
        : HeaderComponentActions.white()
    );
  }
  toggle() {
    this.opened = !this.opened;
  }
  openFriendsList() {
    this.store.dispatch(FriendsListActions.open());
  }
}
