import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filenameTrim',
  standalone: true,
})
export class FilenameTrimPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.substring(value.indexOf('_') + 1);
  }
}
