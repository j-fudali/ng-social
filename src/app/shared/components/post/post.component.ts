import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { Post } from '../../interfaces/posts/post';
import { BottomPanelComponent } from './components/bottom-panel/bottom-panel.component';
import { environment } from 'src/environments/environment.development';
import { FilesFilterPipe } from '../../pipes/files-filter.pipe';
import { ReactionPipe } from '../../pipes/reaction.pipe';
import { Reaction } from '../../interfaces/reactions/reactions';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    DialogModule,
    LayoutModule,
    BottomPanelComponent,
    NgOptimizedImage,
    FilesFilterPipe,
    ReactionPipe,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  @Input({ required: true }) post: Post;
  @Input({ required: true }) userId: string;
  @Output() onOpenComments = new EventEmitter<string>();
  @Output() onDownloadFilesOpen = new EventEmitter<
    {
      url: string;
    }[]
  >();
  @Output() onOpenImageSlider = new EventEmitter<{ url: string }[]>();
  @Output() onReactionAdd = new EventEmitter<{
    postId: string;
    reaction: string;
  }>();
  @Output() onReactionChange = new EventEmitter<{
    postId: string;
    reactionId: string;
    reaction: string;
  }>();
  readMore: boolean = false;
  publicUrl = environment.url + '/';
  userReaction: string | undefined;
  ngOnInit(): void {
    this.userReaction = this.post.reactions.find(
      (r) => r.author._id === this.userId
    )?.reaction;
  }
  openImagesSlider() {
    const images = new FilesFilterPipe().transform(this.post.files!, 'images');
    this.onOpenImageSlider.emit(images);
  }
  openComments() {
    this.onOpenComments.emit(this.post._id);
  }
  reactionAdd(reaction: string) {
    this.onReactionAdd.emit({
      postId: this.post._id,
      reaction: reaction,
    });
    this.userReaction = reaction;
  }
  reactionChange(reaction: string) {
    if (this.post.reactions.find((r) => r.author._id === this.userId))
      this.onReactionChange.emit({
        postId: this.post._id,
        reactionId: this.post.reactions.find(
          (r) => r.author._id === this.userId
        )!._id,
        reaction,
      });
    if (this.userReaction) this.userReaction = reaction;
  }
  openDownloadFiles(files: { url: string }[]) {
    const filteredFiles = new FilesFilterPipe().transform(files);
    if (filteredFiles.length > 0) {
      this.onDownloadFilesOpen.emit(filteredFiles);
    }
  }
  toggleReadMore() {
    this.readMore = !this.readMore;
  }
}
