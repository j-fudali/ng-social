import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Output() onSearch = new EventEmitter<string>();
  @Output() onReset = new EventEmitter<void>();
  searchedText: string;
  search() {
    this.onSearch.emit(this.searchedText);
  }
  reset() {
    this.searchedText = '';
    this.onReset.emit();
  }
}
