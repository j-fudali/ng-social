import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ChatsState } from './chats.reducer';

export const selectChatsList = (state: AppState) => state.chatsList;
