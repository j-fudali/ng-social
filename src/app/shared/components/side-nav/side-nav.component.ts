import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavComponentActions } from '../../store/nav';
import { NavComponent } from './components/nav/nav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { UserActions } from '../../store/user';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('slide', [
      state(
        'false',
        style({
          display: 'none',
        })
      ),
      state(
        'true',
        style({
          display: 'flex',
        })
      ),
      transition('false=>true', [
        style({
          display: 'flex',
          transform: 'translateX(-100%)',
        }),
        animate(
          '200ms ease-out',
          style({
            transform: 'translateX(0)',
          })
        ),
      ]),
      transition('true=>false', [
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
  ],
})
export class SideNavComponent implements OnInit {
  private store = inject(Store);
  private breakpoints = inject(BreakpointObserver);
  isGtMd$ = this.breakpoints
    .observe('(min-width: 768px)')
    .pipe(map((v) => v.matches));
  isOpen: boolean = false;
  ngOnInit(): void {
    setTimeout(() => (this.isOpen = true), 150);
  }
  closeSidenav() {
    this.isOpen = false;
    setTimeout(() => this.store.dispatch(NavComponentActions.close()), 150);
  }

  logout() {
    this.store.dispatch(UserActions.logOut());
  }
}
