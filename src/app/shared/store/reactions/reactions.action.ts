import { createActionGroup, props } from '@ngrx/store';
import { Reaction } from '../../interfaces/reactions/reactions';

export const ReactionsActions = createActionGroup({
  source: 'Reactions',
  events: {},
});
