import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsSliderComponent } from './components/posts-slider/posts-slider.component';

@Component({
  standalone: true,
  imports: [CommonModule, PostsSliderComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {}
