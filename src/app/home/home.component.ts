import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FriendsListComponent } from './components/friends-list/friends-list.component';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    FriendsListComponent,
    SidenavComponent,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {}
