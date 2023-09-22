import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionPipe } from 'src/app/shared/pipes/reaction.pipe';

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
  @Input({ required: true }) lastReaction: string | null;
  @Input() filesNumber: number;
  @Output() onCommentsOpen = new EventEmitter<void>();
  @Output() onOpenDownloadFiles = new EventEmitter<void>();
  @Output() onReaction = new EventEmitter<string>();

  commentsNumber: number = 0;
  openComments() {
    this.onCommentsOpen.emit();
  }
  openDownloadFiles() {
    this.onOpenDownloadFiles.emit();
  }
  like() {
    if (this.lastReaction != 'like') {
      this.onReaction.emit('like');
      this.likesNumber++;
      if (this.lastReaction != null) this.dislikesNumber--;
      this.lastReaction = 'like';
    }
  }
  dislike() {
    if (this.lastReaction != 'dislike') {
      this.onReaction.emit('dislike');
      this.dislikesNumber++;
      if (this.lastReaction != null) this.likesNumber--;
      this.lastReaction = 'dislike';
    }
  }
}
