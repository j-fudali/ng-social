import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from 'src/app/shared/post/post.component';
import { SearchBarComponent } from 'src/app/shared/search-bar/search-bar.component';
import { PeopleListComponent } from 'src/app/shared/people-list/people-list.component';
import { NewPostFormComponent } from 'src/app/shared/new-post-form/new-post-form.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    PostComponent,
    SearchBarComponent,
    PeopleListComponent,
    NewPostFormComponent,
  ],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {}
