import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { visibilityValidator } from 'src/app/shared/validators/visiblity.validator';

@Component({
  selector: 'app-add-new-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-new-post.component.html',
  styleUrls: ['./add-new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewPostComponent {
  private fb = inject(FormBuilder);
  newPostForm = this.fb.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
    categories: [[], Validators.required, Validators.minLength(1)],
    visibility: [
      'public',
      [Validators.required, visibilityValidator(['public', 'private'])],
    ],
  });
}
