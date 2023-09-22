import { ChangeDetectionStrategy, Component, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent implements ControlValueAccessor {
  files: FileList | null;
  changed: (value: FileList | null) => void;
  touched: () => void;
  isDisabled: boolean;
  writeValue(value: FileList) {
    this.files = value;
  }

  onChange(event: Event): void {
    const files: FileList | null = (<HTMLInputElement>event.target).files;
    this.files = files;
    this.changed(files);
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
