import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsListComponent } from './components/groups-list/groups-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, GroupsListComponent],
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent {
  groups: any;
}
