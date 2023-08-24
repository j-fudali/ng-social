import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostFormComponent } from 'src/app/shared/components/new-post-form/new-post-form.component';
import { PeopleListComponent } from 'src/app/shared/components/people-list/people-list.component';
import { PostComponent } from 'src/app/shared/components/post/post.component';
import { SearchBarComponent } from 'src/app/shared/components/search-bar/search-bar.component';

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
