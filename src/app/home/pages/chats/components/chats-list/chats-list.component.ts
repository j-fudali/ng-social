import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.scss'],
})
export class ChatsListComponent {
  @Input({ required: true }) chats: ReadonlyArray<any> = [];
  @Output() hideChatsListEvent = new EventEmitter<void>();
  hideChatsList() {
    if (window.innerWidth < 768) this.hideChatsListEvent.emit();
  }
}
