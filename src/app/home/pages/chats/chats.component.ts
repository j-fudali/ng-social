import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, ChatsListComponent, RouterModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent {
  openedChatsList: boolean = true;
  isMediumBreakpoint: boolean = false;
  toggle() {
    this.openedChatsList = !this.openedChatsList;
  }
}
