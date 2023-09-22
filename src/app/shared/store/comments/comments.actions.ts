import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../interfaces/comments/comment';
import { Error } from '../../interfaces/error';

export const CommentsAction = createActionGroup({
  source: 'Comments',
  events: {
    Load: props<{ postId: string }>(),
    'Load Success': props<{ comments: Comment[] }>(),
    'Load Failure': props<{ error: Error }>(),
  },
});
