import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './components/group/group.component';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [CommonModule, GroupComponent],
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsListComponent {}
