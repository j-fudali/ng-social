import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../../../../shared/post/post.component';

@Component({
  selector: 'app-posts-slider',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './posts-slider.component.html',
  styleUrls: ['./posts-slider.component.scss'],
})
export class PostsSliderComponent implements OnInit {
  @Input() posts: any[] = [1, 2, 3, 4, 5, 6];
  actualPost: number = 0;
  mediumScreenBreakpoint = 768;
  isMediumBreakpoint = false;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const screenWidth = (event.target as Window).innerWidth;
    screenWidth < this.mediumScreenBreakpoint
      ? (this.isMediumBreakpoint = false)
      : (this.isMediumBreakpoint = true);
    this.actualPost = 0;
  }
  ngOnInit(): void {
    window.innerWidth < this.mediumScreenBreakpoint
      ? (this.isMediumBreakpoint = false)
      : (this.isMediumBreakpoint = true);
  }
  next() {
    if (
      Math.abs(this.actualPost) <
      this.posts.length - (this.isMediumBreakpoint ? 2 : 1)
    )
      this.actualPost--;
  }
  prev() {
    if (this.actualPost < 0) this.actualPost++;
  }
}
