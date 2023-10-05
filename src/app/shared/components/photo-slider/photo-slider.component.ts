import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';
import { sliderImages } from '../../store/posts';
import { tap } from 'rxjs';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-photo-slider',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoSliderComponent {
  private dialogRef = inject(DialogRef);
  public data: { images: { url: string }[] } = inject(DIALOG_DATA);
  publicUrl = environment.url + '/';
  selectedImage: string = this.data.images[0].url;
  onSelect(image: string) {
    this.selectedImage = image;
  }
  close() {
    this.dialogRef.close();
  }
}
