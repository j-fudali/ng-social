import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { sliderImages } from '../../store/posts';
import { tap } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';

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
  private dialogRef = inject(DialogRef);
  sliderImages$ = this.store.select(sliderImages);
  publicUrl = environment.url + '/';
  selectedImage: string;
  onSelect(image: string) {
    this.selectedImage = image;
  }
  close() {
    this.dialogRef.close();
  }
}
