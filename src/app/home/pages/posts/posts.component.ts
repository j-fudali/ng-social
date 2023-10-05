import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';
import { Store } from '@ngrx/store';
import {
  loading,
  pagination,
  posts,
} from 'src/app/shared/store/posts/posts.selectors';
import { PostsActions } from 'src/app/shared/store/posts/posts.actions';
import { Subject, map, takeUntil, tap } from 'rxjs';
import {
  CommentsAction,
  comments,
  commentsPagination,
  selectComments,
} from 'src/app/shared/store/comments';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { PhotoSliderComponent } from 'src/app/shared/components/photo-slider/photo-slider.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { NewPost } from 'src/app/shared/interfaces/posts/new-post';
import { Post } from 'src/app/shared/interfaces/posts/post';
import { DownloadFilesListComponent } from 'src/app/shared/components/download-files-list/download-files-list.component';
import { UsersService } from 'src/app/core/services/users.service';
import { SharedActions } from 'src/app/shared/store/shared/shared.actions';
import { Pagination } from 'src/app/shared/interfaces/pagination';
import { ActivatedRoute } from '@angular/router';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CommentsComponent,
    PostComponent,
    LoaderComponent,
    InfiniteScrollModule,
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
export class PostsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(Dialog);
  private usersService = inject(UsersService);
  posts$ = this.store.select(posts);
  loading$ = this.store.select(loading);
  pagination$ = this.store.select(pagination);
  userId = this.usersService.getUserId();
  commentsState$ = this.store.select(selectComments);
  searchText: string | null;
  commentsDialogRef: DialogRef<CommentsComponent, CommentsComponent>;

  destroy$ = new Subject();
  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        map((params) => params.get('search')),
        tap((v) =>
          v
            ? this.store.dispatch(PostsActions.searchPublic({ search: v }))
            : this.store.dispatch(PostsActions.load({}))
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((v) => (this.searchText = v));
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  openComments(postId: string) {
    this.store.dispatch(CommentsAction.load({ postId }));
    this.commentsDialogRef = this.dialog.open(CommentsComponent, {
      minWidth: '50%',
      maxWidth: '80%',
      height: '90%',
      data: {
        commentsState: this.commentsState$,
      },
    });
  }
  openImagesSlider(images: { url: string }[]) {
    this.store.dispatch(PostsActions.setImages({ images }));
    this.dialog.open(PhotoSliderComponent, {
      width: '100%',
      height: '100%',
      data: {
        images,
      },
    });
  }
  onScroll(pagination: Pagination) {
    if (pagination.page * pagination.limit < pagination.count!)
      this.searchText
        ? this.store.dispatch(
            PostsActions.searchPublic({
              search: this.searchText,
              page: pagination.page + 1,
            })
          )
        : this.store.dispatch(PostsActions.load({ page: pagination.page + 1 }));
  }
  openNewPostDialog() {
    const ref = this.dialog.open(AddNewPostComponent, {
      minWidth: '50%',
      maxWidth: '80%',
    });
    ref.closed.subscribe((result) => {
      if (result) {
        this.store.dispatch(PostsActions.addPost({ post: result as NewPost }));
        this.store.dispatch(SharedActions.showSpinner());
      }
    });
  }
  openDownloadFiles(files: { url: string }[]) {
    this.dialog.open(DownloadFilesListComponent, {
      minWidth: '50%',
      maxWidth: '80%',
      data: {
        files,
      },
    });
  }
  addReaction(event: { postId: string; reaction: string }) {
    this.store.dispatch(
      PostsActions.addReactionToPost({
        postId: event.postId,
        reaction: event.reaction,
      })
    );
  }
  changeReaction(event: {
    postId: string;
    reactionId: string;
    reaction: string;
  }) {
    this.store.dispatch(
      PostsActions.changeReactionToPost({
        postId: event.postId,
        reactionId: event.reactionId,
        newReaction: event.reaction,
      })
    );
  }
  trackByPosts(index: number, post: Post): string {
    return post._id;
  }
}
