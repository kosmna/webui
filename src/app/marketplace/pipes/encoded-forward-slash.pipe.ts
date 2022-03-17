import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'forwardSlash'
})
export class EncodedForwardSlashPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value) {
      value = value.replace(/%2F/g, '/');
    }
    return value;
  }

}
