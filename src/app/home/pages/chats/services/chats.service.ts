import { Injectable } from '@angular/core';
import { Conversation } from 'src/app/shared/interfaces/conversation';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  chats: Conversation[] = [
    { _id: '1', name: 'Chat 1', createdAt: new Date(), updatedAt: new Date() },
    { _id: '2', name: 'Chat 2', createdAt: new Date(), updatedAt: new Date() },
    { _id: '3', name: 'Chat 3', createdAt: new Date(), updatedAt: new Date() },
    { _id: '4', name: 'Chat 4', createdAt: new Date(), updatedAt: new Date() },
  ];
  constructor() {}
  getConversations() {
    return this.chats;
  }
}
