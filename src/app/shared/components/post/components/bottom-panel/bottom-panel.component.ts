import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionPipe } from 'src/app/shared/pipes/reaction.pipe';
import { Reaction } from 'src/app/shared/interfaces/reactions/reactions';

@Component({
  selector: 'app-bottom-panel',
  standalone: true,
  imports: [CommonModule, ReactionPipe],
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomPanelComponent {
  @Input({ required: true }) likesNumber: number;
  @Input({ required: true }) dislikesNumber: number;
  @Input({ required: true }) lastReaction: string | undefined;
  @Input() filesNumber: number;
  @Output() onCommentsOpen = new EventEmitter<void>();
  @Output() onOpenDownloadFiles = new EventEmitter<void>();
  @Output() onReactionAdd = new EventEmitter<string>();
  @Output() onReactionChange = new EventEmitter<string>();

  commentsNumber: number = 0;
  openComments() {
    this.onCommentsOpen.emit();
  }
  openDownloadFiles() {
    this.onOpenDownloadFiles.emit();
  }
  like() {
    if (this.lastReaction === undefined) this.onReactionAdd.emit('like');
    if (this.lastReaction === 'dislike') {
      this.onReactionChange.emit('like');
      this.dislikesNumber--;
    }
    if (this.lastReaction !== 'like') this.likesNumber++;
  }
  dislike() {
    if (this.lastReaction === undefined) this.onReactionAdd.emit('dislike');
    if (this.lastReaction === 'like') {
      this.onReactionChange.emit('dislike');
      this.likesNumber--;
    }
    if (this.lastReaction !== 'dislike') this.dislikesNumber++;
  }
}
