import { createActionGroup, emptyProps } from '@ngrx/store';

export const HeaderComponentActions = createActionGroup({
  source: 'Header Component',
  events: {
    Dark: emptyProps(),
    White: emptyProps(),
  },
});
