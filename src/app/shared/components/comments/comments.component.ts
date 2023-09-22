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
import { LayoutModule } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { comments } from '../../store/comments';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoaderComponent } from '../loader/loader.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Comment } from '../../interfaces/comments/comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    NewMessageComponent,
    LayoutModule,
    LoaderComponent,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  public data: { comments: Observable<Comment[] | null> } = inject(DIALOG_DATA);
  private dialogRef = inject(DialogRef<CommentsComponent>);
  close() {
    this.dialogRef.close();
  }
}
