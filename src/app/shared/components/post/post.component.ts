import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { LayoutModule } from '@angular/cdk/layout';
import { Post } from '../../interfaces/posts/post';
import { BottomPanelComponent } from './components/bottom-panel/bottom-panel.component';
import { environment } from 'src/environments/environment.development';
import { FilesFilterPipe } from '../../pipes/files-filter.pipe';
import { Store } from '@ngrx/store';
import { PostsActions } from '../../store/posts';
import { DownloadFilesListComponent } from '../download-files-list/download-files-list.component';
import { ReactionPipe } from '../../pipes/reaction.pipe';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from 'src/app/core/services/users.service';

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
  private dialog = inject(Dialog);
  private usersService = inject(UsersService);
  private cd = inject(ChangeDetectorRef);
  @Input({ required: true }) post: Post;
  @Output() onOpenComments = new EventEmitter<string>();
  @Output() onOpenImageSlider = new EventEmitter<{ url: string }[]>();
  @Output() onReactionAdd = new EventEmitter<{
    postId: string;
    reaction: string;
  }>();
  @Output() onReactionChange = new EventEmitter<{
    postId: string;
    reaction: string;
  }>();
  readMore: boolean = false;
  publicUrl = environment.url + '/';
  alreadyReacted = false;
  lastReaction: string | null = null;
  ngOnInit(): void {
    const userReaction = this.post.reactions.find(
      (r) => r.author._id === this.usersService.getUserId()
    );
    if (userReaction) {
      this.lastReaction = userReaction.reaction;
      this.alreadyReacted = true;
    }
  }
  openImagesSlider() {
    this.onOpenImageSlider.emit(this.post.files);
  }
  openComments() {
    this.onOpenComments.emit(this.post._id);
  }
  react(reaction: string) {
    if (this.alreadyReacted) {
      this.onReactionChange.emit({ postId: this.post._id, reaction });
    } else {
      this.onReactionAdd.emit({ postId: this.post._id, reaction });
      this.alreadyReacted = true;
    }
  }
  openDownloadFiles(files: { url: string }[]) {
    const filteredFiles = new FilesFilterPipe().transform(files);
    if (filteredFiles.length > 0) {
      this.dialog.open(DownloadFilesListComponent, {
        minWidth: '50%',
        maxWidth: '80%',
        data: {
          files: filteredFiles,
        },
      });
    }
  }
  toggleReadMore() {
    this.readMore = !this.readMore;
  }
}
