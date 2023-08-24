import { createReducer, on } from '@ngrx/store';
import { ChatsActions } from './chats.actions';

export interface ChatsState {
  selectedChat: number | undefined;
}
export const initialValue: ChatsState = {
  selectedChat: undefined,
};
export const chatsListReducer = createReducer(initialValue);
