import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { visibilityValidator } from 'src/app/shared/validators/visiblity.validator';
import { FormControlComponent } from 'src/app/shared/components/form-control/form-control.component';
import { FileUploadComponent } from 'src/app/shared/components/file-upload/file-upload.component';
import { DialogModule, DialogRef } from '@angular/cdk/dialog';
import { NewPost } from 'src/app/shared/interfaces/posts/new-post';
import { ToggleButtonComponent } from 'src/app/shared/components/toggle-button/toggle-button.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [
    CommonModule,
    DialogComponent,
    ReactiveFormsModule,
    FormControlComponent,
    FileUploadComponent,
    ToggleButtonComponent,
    PickerComponent,
  ],
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
})
export class AddNewPostComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  cursorPosition: number | undefined;
  emojiOpened: boolean = false;
  newPostForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    newCategory: [''],
    categories: [[], [Validators.required]],
    visibility: [true, [Validators.required]],
    files: [[]],
  });

  get title() {
    return this.newPostForm.get('title');
  }
  get text() {
    return this.newPostForm.get('text');
  }
  get categories() {
    return this.newPostForm.get('categories');
  }
  get newCategory() {
    return this.newPostForm.get('newCategory');
  }

  get visibility() {
    return this.newPostForm.get('visibility');
  }
  get files() {
    return this.newPostForm.get('files');
  }
  openEmoji() {
    this.emojiOpened = true;
  }
  closeEmoji() {
    this.emojiOpened = false;
  }
  addCategory() {
    if (this.newCategory?.value != '') {
      this.categories?.setValue([
        ...this.categories.value,
        this.newCategory?.value,
      ]);
      this.newCategory?.reset();
    }
  }
  removeCategory(id: number) {
    (this.categories?.value as string[]).splice(id, 1);
  }

  addEmoji(e: any) {
    const postText = this.newPostForm.get('text');
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
  submit() {
    if (this.newPostForm.dirty && this.newPostForm.valid) {
      const files = [...this.files?.value];
      const post: NewPost = {
        title: this.title?.value,
        text: this.text?.value,
        categories: this.categories?.value,
        visibility: this.visibility?.value ? 'public' : 'private',
        files,
      };
      this.dialogRef.close(post);
    }
  }
}
