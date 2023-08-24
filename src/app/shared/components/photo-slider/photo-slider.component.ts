import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photo-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoSliderComponent {

}
