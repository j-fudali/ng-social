import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { environment } from 'src/environments/environment.development';
import { FilenameTrimPipe } from '../../pipes/filename-trim.pipe';

@Component({
  selector: 'app-download-files-list',
  standalone: true,
  imports: [CommonModule, FilenameTrimPipe],
  templateUrl: './download-files-list.component.html',
  styleUrls: ['./download-files-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadFilesListComponent {
  public data: { files: { url: string }[] } = inject(DIALOG_DATA);
  publicUrl = environment.url;
  trackBy(index: number): number {
    return index;
  }
}
