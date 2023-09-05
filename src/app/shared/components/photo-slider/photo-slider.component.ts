import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { sliderImages } from '../../store/posts';
import { tap } from 'rxjs';

@Component({
  selector: 'app-photo-slider',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSliderComponent {
  private store = inject(Store);
  sliderImages$ = this.store
    .select(sliderImages)
    .pipe(tap((v) => console.log(v)));
  publicUrl = environment.url + '/';
  selectedImage: string;
  onSelect(image: string) {
    this.selectedImage = image;
  }
}
