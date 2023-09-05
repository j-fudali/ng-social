import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
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

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
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
  isOpen: boolean = false;
  closeNav() {
    this.isOpen = false;
    setTimeout(() => this.store.dispatch(NavComponentActions.close()), 150);
  }
  ngOnInit(): void {
    setTimeout(() => (this.isOpen = true), 150);
  }
}
