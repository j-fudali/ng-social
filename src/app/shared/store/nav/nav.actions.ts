import { createAction, createActionGroup, emptyProps } from '@ngrx/store';

export const NavComponentActions = createActionGroup({
  source: 'Nav Component',
  events: {
    Open: emptyProps(),
    Close: emptyProps,
  },
});
