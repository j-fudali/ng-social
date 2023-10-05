import { createReducer, on } from '@ngrx/store';
import { Reaction } from '../../interfaces/reactions/reactions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export interface ReactionsState extends EntityState<Reaction> {}
export const reactionsAdapter: EntityAdapter<Reaction> =
  createEntityAdapter<Reaction>();
export const initialState: ReactionsState = reactionsAdapter.getInitialState();
