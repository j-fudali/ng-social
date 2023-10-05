import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss'],
})
export class NewMessageComponent {
  @Output() onSend = new EventEmitter<{ message: string; image?: File }>();
  @Input() multiply: boolean = false;
  imagesPreview: string[] = [];
  message: string;
  image: File;
  onImagesSelect(event: Event) {
    const image = (event.target as any).file;
    console.log(image);
    // for (let img of images) {
    //   const reader = new FileReader();
    //   reader.onload = (e: any) => {
    //     this.imagesPreview.push(e.target.result);
    //   };
    //   reader.readAsDataURL(img);
    // }
    // this.image = [...images];
  }
  remove(index: number) {
    this.imagesPreview.splice(index, 1);
    // this.images.splice(index, 1);
  }
  submit() {
    //   if (this.message != '') {
    //     if (this.images.length > 0) {
    //       this.onSend.emit({ message: this.message, image: this.image });
    //     }
    //     this.onSend.emit({ message: this.message });
    //   }
  }
}
