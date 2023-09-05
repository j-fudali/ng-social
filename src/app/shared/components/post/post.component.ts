import {
  AfterViewInit,
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
import { Dialog, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { PhotoSliderComponent } from '../photo-slider/photo-slider.component';
import { CommentsComponent } from '../comments/comments.component';
import {
  BreakpointObserver,
  LayoutModule,
  MediaMatcher,
} from '@angular/cdk/layout';
import { ModalComponent } from '../modal/modal.component';
import { Post } from '../../interfaces/posts/post';
import { BottomPanelComponent } from './components/bottom-panel/bottom-panel.component';
import { environment } from 'src/environments/environment.development';

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
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input({ required: true }) post: Post;
  @Output() onOpenComments = new EventEmitter<string>();
  @Output() onOpenImageSlider = new EventEmitter<{ url: string }[]>();
  readMore: boolean = false;
  publicUrl = environment.url + '/';

  openImagesSlider() {
    this.onOpenImageSlider.emit(this.post.files);
  }
  openComments() {
    this.onOpenComments.emit(this.post._id);
  }
  toggleReadMore() {
    this.readMore = !this.readMore;
  }
}
