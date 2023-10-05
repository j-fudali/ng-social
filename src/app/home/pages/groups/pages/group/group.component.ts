import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
  templateUrl: './group.component.html',
})
export class GroupComponent {}
