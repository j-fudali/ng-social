import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostFormComponent } from 'src/app/shared/components/new-post-form/new-post-form.component';
import { AddNewPostButtonComponent } from 'src/app/shared/components/add-new-post-button/add-new-post-button.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { Store } from '@ngrx/store';
import { posts } from 'src/app/shared/store/posts/posts.selectors';
import { PostsActions } from 'src/app/shared/store/posts/posts.actions';
import { map, scan } from 'rxjs';
import {
  CommentsAction,
  showCommentsComponent,
} from 'src/app/shared/store/comments';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { PhotoSliderComponent } from 'src/app/shared/components/photo-slider/photo-slider.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NewPostFormComponent,
    AddNewPostButtonComponent,
    CommentsComponent,
    PostsListComponent,
    LoaderComponent,
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ zIndex: -1, opacity: 0, transform: 'translateX(100%)' }),
        animate(
          '200ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('150ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class PostsComponent implements OnInit {
  private store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(Dialog);
  posts$ = this.store.select(posts).pipe(
    scan((acc, curr) => {
      if (acc?.result && curr?.result) {
        return { result: [...acc.result, ...curr.result], count: curr.count };
      }
      return curr;
    })
  );
  showCommentsComponent$ = this.store.select(showCommentsComponent);
  commentsModalRef: DialogRef<Dialog, ModalComponent>;
  postIdOfComments: string | null;

  page: number = 1;
  limit: number = 4;
  ngOnInit(): void {
    this.store.dispatch(
      PostsActions.load({ pagination: { page: this.page, limit: this.limit } })
    );
    this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(map((v) => v.matches))
      .subscribe((v) => {
        if (!v && this.commentsModalRef) this.commentsModalRef.close();
      });
  }
  openComments(postId: string) {
    if (postId !== this.postIdOfComments) {
      this.postIdOfComments = postId;
      this.store.dispatch(CommentsAction.load({ postId }));
    }
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.commentsModalRef = this.dialog.open(ModalComponent, {
        data: { component: CommentsComponent },
      });
    }
  }
  closeComments() {
    this.store.dispatch(CommentsAction.componentClose());
    this.postIdOfComments = null;
  }
  openImagesSlider(images: { url: string }[]) {
    this.store.dispatch(PostsActions.setImages({ images }));
    this.dialog.open(ModalComponent, {
      data: {
        component: PhotoSliderComponent,
      },
    });
  }
  onPostsScroll(count: number) {
    if (count > this.page * this.limit) {
      this.page++;
      this.store.dispatch(
        PostsActions.load({
          pagination: { page: this.page, limit: this.limit },
        })
      );
    }
  }
}
