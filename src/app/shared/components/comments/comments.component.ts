import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { NewMessageComponent } from '../new-message/new-message.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoaderComponent } from '../loader/loader.component';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Comment } from '../../interfaces/comments/comment';
import { Observable } from 'rxjs';
import { Pagination } from '../../interfaces/pagination';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DialogComponent } from '../dialog/dialog.component';
import { Store } from '@ngrx/store';
import { CommentsAction } from '../../store/comments';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    DialogComponent,
    NewMessageComponent,
    LayoutModule,
    LoaderComponent,
    InfiniteScrollModule,
  ],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  public data: {
    commentsState: Observable<{
      comments: Comment[];
      pagination: Pagination;
      loading: boolean;
    }>;
  } = inject(DIALOG_DATA);
  private store = inject(Store);
  sendMessage(message: { message: string; image?: File }) {
    this.store.dispatch(
      CommentsAction.addComment({
        message: message.message,
        image: message.image,
      })
    );
  }
}
