import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '../../interfaces/posts/post';
import { Error } from '../../interfaces/error';
import { Pagination } from '../../interfaces/pagination';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    Load: props<{ pagination: Pagination }>(),
    'Load Success': props<{ result: Post[]; count: number }>(),
    'Load Failure': props<{ error: Error }>(),
    'Set Images': props<{ images: { url: string }[] }>(),
  },
});
