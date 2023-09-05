import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SharedActions = createActionGroup({
  source: 'Shared',
  events: {
    ShowSpinner: emptyProps(),
    HideSpinner: emptyProps(),
    SetNotification: props<{ message: string; mode: string }>(),
  },
});
