import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string | number, find: string | number, replace: any): any {
    if (value === find) {
      return replace;
    }
    return value;
  }

}
