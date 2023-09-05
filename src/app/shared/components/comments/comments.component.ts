import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { NewMessageComponent } from '../new-message/new-message.component';
import { ModalComponent } from '../modal/modal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { comments } from '../../store/comments';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    NewMessageComponent,
    ModalComponent,
    LayoutModule,
    LoaderComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  private store = inject(Store);
  comments$ = this.store.select(comments);
  @Output() onCloseComments = new EventEmitter<void>();
  closeComments() {
    this.onCloseComments.emit();
  }
}
