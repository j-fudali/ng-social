import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Post } from '../../interfaces/posts/post';
import { Error } from '../../interfaces/error';
import { NewPost } from '../../interfaces/posts/new-post';
import { Reaction } from '../../interfaces/reactions/reactions';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    Reset: emptyProps(),
    Load: props<{ page?: number }>(),
    'Load Success': props<{ result: Post[]; count: number }>(),
    'Load Failure': props<{ error: Error }>(),
    'Set Images': props<{ images: { url: string }[] }>(),
    'Add Post': props<{ post: NewPost }>(),
    'Add Post Success': props<{ post: Post }>(),
    'Add Post Failure': props<{ error: Error }>(),
    'Search Public': props<{ search: string; page?: number }>(),
    'Search Public Success': props<{ result: Post[]; count: number }>(),
    'Search Public Failure': props<{ error: Error }>(),
    'Add Reaction To Post': props<{ postId: string; reaction: string }>(),
    'Add Reaction To Success': props<{ postId: string; reaction: Reaction }>(),
    'Add Reaction To Post Failure': props<{ error: Error }>(),
    'Change Reaction To Post': props<{
      postId: string;
      reactionId: string;
      newReaction: string;
    }>(),
    'Change Reaction To Post Success': props<{
      postId: string;
      reaction: Reaction;
    }>(),
    'Change Reaction To Post Failure': props<{ error: Error }>(),
  },
});
