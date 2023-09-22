import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
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

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlComponent,
    FileUploadComponent,
    DialogModule,
    ToggleButtonComponent,
  ],
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewPostComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(DialogRef);
  newPostForm: FormGroup = this.fb.nonNullable.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    newCategory: [''],
    categories: [[], [Validators.required]],
    visibility: [
      'public',
      [Validators.required, visibilityValidator(['public', 'private'])],
    ],
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
  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.newPostForm.dirty && this.newPostForm.valid) {
      const post: NewPost = {
        title: this.title?.value,
        text: this.text?.value,
        categories: this.categories?.value,
        visibility: this.visibility?.value,
        files: this.files?.value,
      };
      this.dialogRef.close(post);
    }
  }
}
