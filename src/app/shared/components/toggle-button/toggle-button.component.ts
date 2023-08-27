import {
  ChangeDetectionStrategy,
  Component,
  Input,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule],
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent implements ControlValueAccessor {
  @Input() name: string;
  checked: boolean;
  changed: (value: boolean) => void;
  touched: () => void;
  isDisabled: boolean;
  writeValue(value: boolean) {
    this.checked = value;
  }
  onChange(event: Event): void {
    const checked: boolean = (<HTMLInputElement>event.target).checked;
    this.checked = checked;
    this.changed(checked);
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
