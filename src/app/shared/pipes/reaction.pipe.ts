import { Pipe, PipeTransform } from '@angular/core';
import { Reaction } from '../interfaces/reactions/reactions';

@Pipe({
  name: 'reaction',
  standalone: true,
})
export class ReactionPipe implements PipeTransform {
  transform(reactions: Reaction[], type: string): Reaction[] {
    return reactions.filter((r) =>
      type === 'like' ? r.reaction === 'like' : r.reaction === 'dislike'
    );
  }
}
