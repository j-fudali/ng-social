import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatsListComponent } from './components/chats-list/chats-list.component';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChatsActions } from 'src/app/shared/store/chats';
import { Conversation } from 'src/app/shared/interfaces/conversation';
import { ChatsService } from './services/chats.service';

@Component({
  standalone: true,
  imports: [CommonModule, ChatsListComponent, RouterModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  private store = inject(Store);
  private chatsService = inject(ChatsService);
  chats$: Conversation[] = [];
  openedChatsList: boolean = true;
  isMediumBreakpoint: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(e: Event) {
    this.isMediumBreakpoint = (e.target as any).innerWidth < 768 ? false : true;
  }
  ngOnInit(): void {
    this.isMediumBreakpoint = window.innerWidth < 768 ? false : true;
    this.chats$ = this.chatsService.getConversations();
  }
  toggle() {
    this.openedChatsList = !this.openedChatsList;
  }
}
