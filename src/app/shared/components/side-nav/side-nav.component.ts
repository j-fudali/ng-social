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
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NavComponentActions } from '../../store/nav';
import { NavComponent } from '../nav/nav.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { UserActions } from '../../store/user';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule, NavComponent],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  private store = inject(Store);
  private breakpoints = inject(BreakpointObserver);
  isGtMd$ = this.breakpoints
    .observe('(min-width: 768px)')
    .pipe(map((v) => v.matches));
  // isOpen: boolean = false;
  ngOnInit(): void {
    // setTimeout(() => (this.isOpen = true), 150);
  }
  closeSidenav() {
    // this.isOpen = false;
    setTimeout(() => this.store.dispatch(NavComponentActions.close()), 150);
  }

  logout() {
    this.store.dispatch(UserActions.logOut());
  }
}
