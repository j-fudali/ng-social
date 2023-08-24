import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsSliderComponent } from './components/posts-slider/posts-slider.component';
import { NewPostFormComponent } from 'src/app/shared/components/new-post-form/new-post-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, PostsSliderComponent, NewPostFormComponent],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {}
