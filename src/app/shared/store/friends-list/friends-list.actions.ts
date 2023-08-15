import { createActionGroup, emptyProps } from '@ngrx/store';

export const FriendsListActions = createActionGroup({
  source: 'Friends List',
  events: {
    Open: emptyProps(),
    Close: emptyProps(),
  },
});
