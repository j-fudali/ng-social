import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-new-post-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-new-post-button.component.html',
  styleUrls: ['./add-new-post-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddNewPostButtonComponent {

}
