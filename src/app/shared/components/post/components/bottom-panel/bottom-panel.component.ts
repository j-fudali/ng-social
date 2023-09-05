import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-panel.component.html',
  styleUrls: ['./bottom-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomPanelComponent {
  @Input({ required: true }) likesNumber: number;
  @Input({ required: true }) dislikesNumber: number;
  @Input() commentsNumber: number = 0;
  @Output() onCommentsOpen = new EventEmitter<void>();

  openComments() {
    this.onCommentsOpen.emit();
  }
}
