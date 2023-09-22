import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { Post } from 'src/app/shared/interfaces/posts/post';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, PostComponent, InfiniteScrollModule],
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsListComponent {
  @Input({ required: true }) posts: Post[] | null = [];
  @Output() onOpenComments = new EventEmitter<string>();
  @Output() onOpenImageSlider = new EventEmitter<{ url: string }[]>();
  @Output() onPostListScroll = new EventEmitter<void>();
  @Output() onReactionAdd = new EventEmitter<{
    postId: string;
    reaction: string;
  }>();
  @Output() onReactionChange = new EventEmitter<{
    postId: string;
    reaction: string;
  }>();
  openComments(postId: string) {
    this.onOpenComments.emit(postId);
  }
  openImageSlider(images: { url: string }[]) {
    this.onOpenImageSlider.emit(images);
  }
  addReaction(event: { postId: string; reaction: string }) {
    this.onReactionAdd.emit(event);
  }
  changeReaction(event: { postId: string; reaction: string }) {
    this.onReactionChange.emit(event);
  }
  onScroll() {
    this.onPostListScroll.emit();
  }
  trackBy(index: number, post: Post): string {
    return post._id;
  }
}
