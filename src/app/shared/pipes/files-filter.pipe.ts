import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesFilter',
  standalone: true,
})
export class FilesFilterPipe implements PipeTransform {
  transform(files: { url: string }[], ...args: string[]): { url: string }[] {
    if (args[0] === 'images') {
      return files.filter((f) => f.url.match(/[^/]+(jpg|png|gif)$/));
    }
    return files.filter((f) => !f.url.match(/[^/]+(jpg|png|gif)$/));
  }
}
