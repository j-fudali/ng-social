import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { NavComponentActions, isOpen } from '../shared/store/nav';
import { HeaderComponentActions, isDark } from '../shared/store/header';
import {
  FriendsListActions,
  isFriendsListOpen,
} from '../shared/store/friends-list';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { SideNavComponent } from '../shared/components/side-nav/side-nav.component';
import { UserActions } from '../shared/store/user';

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
      state(
        'false',
        style({
          display: 'none',
        })
      ),
      state('true', style({ display: 'block' })),
      transition('false=>true', [
        style({
          display: 'block',
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
        'true=>false',
        animate(
          '200ms ease-in',
          style({
            transform: 'translateX(100%)',
            opacity: 0,
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
        : HeaderComponentActions.light()
    );
  }
  toggle() {
    this.opened = !this.opened;
  }
  openFriendsList() {
    this.store.dispatch(FriendsListActions.open());
  }
  logout() {
    this.store.dispatch(UserActions.logOut());
  }
  openSidenav() {
    this.store.dispatch(NavComponentActions.open());
  }
  toggleTheme(darkMode: boolean) {
    this.store.dispatch(
      darkMode ? HeaderComponentActions.dark() : HeaderComponentActions.light()
    );
    localStorage.setItem('darkMode', darkMode ? 'true' : 'false');
  }
}
