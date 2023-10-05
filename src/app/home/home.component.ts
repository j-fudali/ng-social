import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
  query,
} from '@angular/animations';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { HeaderComponent } from '../shared/components/header/header.component';
import { NavComponent } from '../shared/components/nav/nav.component';
import { SideNavComponent } from '../shared/components/side-nav/side-nav.component';
import { UserActions } from '../shared/store/user';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription, map, tap } from 'rxjs';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { PostsActions } from '../shared/store/posts';
import { SharedActions } from '../shared/store/shared/shared.actions';

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
    DialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideSidenav', [
      transition(':enter', [
        query('#sidenav-content', [
          style({
            display: 'flex',
            transform: 'translateX(-100%)',
          }),
          animate(
            '200ms 150ms ease-out',
            style({
              transform: 'translateX(0)',
            })
          ),
        ]),
      ]),
      transition(':leave', [
        query('#sidenav-content', [
          style({
            transform: 'translateX(0)',
          }),
          animate(
            '200ms ease-in',
            style({
              transform: 'translateX(-100%)',
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
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
export class HomeComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private breakpoints = inject(BreakpointObserver);
  private sub: Subscription;
  private router = inject(Router);
  isSidenavOpen$ = this.store.select(isOpen);

  isDark$ = this.store.select(isDark);
  isFriendsListOpen$ = this.store.select(isFriendsListOpen);
  ngOnInit(): void {
    this.store.dispatch(
      localStorage.getItem('darkMode') === 'true'
        ? HeaderComponentActions.dark()
        : HeaderComponentActions.light()
    );
    this.sub = this.breakpoints
      .observe(['(min-width: 768px)'])
      .pipe(
        map((v) => v.matches),
        tap((isMatch) =>
          isMatch ? this.store.dispatch(NavComponentActions.close()) : null
        )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
  toggleTheme(isDark: boolean) {
    this.store.dispatch(
      isDark ? HeaderComponentActions.dark() : HeaderComponentActions.light()
    );
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  }
  search(search: string) {
    this.store.dispatch(PostsActions.searchPublic({ search }));
    this.router.navigate(['/home'], { queryParams: { search } });
  }
  resetSearch() {
    this.store.dispatch(PostsActions.load({}));
    this.router.navigate(['/home']);
  }
}
