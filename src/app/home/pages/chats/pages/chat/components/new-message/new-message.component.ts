import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
  private fb = inject(FormBuilder);
  imagesPreview: string[] = [];
  newMessageForm = this.fb.group({
    text: ['', Validators.required],
    files: [[], Validators.required],
  });
  onImagesSelect(event: Event) {
    const images = (event.target as any).files;
    for (let img of images) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagesPreview.push(e.target.result);
      };
      reader.readAsDataURL(img);
    }
    console.log(this.imagesPreview);
  }
  remove(index: number) {
    this.imagesPreview.splice(index, 1);
  }
}
