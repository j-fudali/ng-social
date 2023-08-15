import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiComponent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-post-form',
  standalone: true,
  imports: [CommonModule, PickerComponent, EmojiComponent, ReactiveFormsModule],
  templateUrl: './new-post-form.component.html',
  styleUrls: ['./new-post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostFormComponent {
  private fb = inject(FormBuilder);
  cursorPosition: number | undefined;
  emojiOpened: boolean = false;
  newPostForm = this.fb.group({
    postText: ['', [Validators.required, Validators.max(500)]],
  });
  open() {
    this.emojiOpened = true;
  }
  close() {
    this.emojiOpened = false;
  }
  addEmoji(e: any) {
    const postText = this.newPostForm.get('postText');
    postText?.setValue(
      postText.value?.slice(0, this.cursorPosition) +
        e.emoji.native +
        postText.value?.slice(this.cursorPosition)
    );
    this.emojiOpened = false;
  }
  setCursorPosition(e: any) {
    this.cursorPosition = e.target.selectionStart;
  }
  submit() {}
}
