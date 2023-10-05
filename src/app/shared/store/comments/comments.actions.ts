import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../interfaces/comments/comment';
import { Error } from '../../interfaces/error';

export const CommentsAction = createActionGroup({
  source: 'Comments',
  events: {
    Load: props<{ postId: string; page?: number }>(),
    'Load Success': props<{ comments: Comment[]; count: number }>(),
    'Load Failure': props<{ error: Error }>(),
    'Add Comment': props<{ message: string; image?: File }>(),
    'Add Comment Success': props<{ comment: Comment }>(),
    'Add Comment Failure': props<{ error: Error }>(),
  },
});
