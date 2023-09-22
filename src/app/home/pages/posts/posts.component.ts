import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostFormComponent } from 'src/app/shared/components/new-post-form/new-post-form.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { Store } from '@ngrx/store';
import { posts } from 'src/app/shared/store/posts/posts.selectors';
import { PostsActions } from 'src/app/shared/store/posts/posts.actions';
import { Subscription, map, scan } from 'rxjs';
import { CommentsAction, comments } from 'src/app/shared/store/comments';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { PhotoSliderComponent } from 'src/app/shared/components/photo-slider/photo-slider.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { AddNewPostComponent } from './components/add-new-post/add-new-post.component';
import { NewPost } from 'src/app/shared/interfaces/posts/new-post';
import { Post } from 'src/app/shared/interfaces/posts/post';
import { ReactionsActions } from 'src/app/shared/store/reactions/reactions.action';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NewPostFormComponent,
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
export class PostsComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private breakpointObserver = inject(BreakpointObserver);
  private dialog = inject(Dialog);
  private sub: Subscription;
  posts$ = this.store.select(posts);

  comments$ = this.store.select(comments);
  commentsDialogRef: DialogRef<CommentsComponent, CommentsComponent>;
  page: number = 1;
  limit: number = 4;
  ngOnInit(): void {
    this.store.dispatch(
      PostsActions.load({ pagination: { page: this.page, limit: this.limit } })
    );
    this.sub = this.breakpointObserver
      .observe('(max-width: 768px)')
      .pipe(map((v) => v.matches))
      .subscribe((v) => {
        if (!v && this.commentsDialogRef) this.commentsDialogRef.close();
      });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  openComments(postId: string) {
    this.store.dispatch(CommentsAction.load({ postId }));
    this.commentsDialogRef = this.dialog.open(CommentsComponent, {
      width: '50%',
      height: '90%',
      data: {
        comments: this.comments$,
      },
    });
  }
  openImagesSlider(images: { url: string }[]) {
    this.store.dispatch(PostsActions.setImages({ images }));
    this.dialog.open(PhotoSliderComponent, {
      width: '100%',
      height: '100%',
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
  openNewPostDialog() {
    const ref = this.dialog.open(AddNewPostComponent, {
      minWidth: '50%',
      maxWidth: '80%',
    });
    ref.closed.subscribe((result) => {
      if (result)
        this.store.dispatch(PostsActions.addPost({ post: result as NewPost }));
    });
  }
  reactionAdd(event: { postId: string; reaction: string }) {
    this.store.dispatch(
      PostsActions.addReactionToPost({
        postId: event.postId,
        reaction: event.reaction,
      })
    );
  }
  reactionChange(event: { postId: string; reaction: string }) {
    this.store.dispatch(
      ReactionsActions.changeReaction({
        postId: event.postId,
        reaction: event.reaction,
      })
    );
  }
  trackByFn(index: number, post: Post): string {
    return post._id;
  }
}
