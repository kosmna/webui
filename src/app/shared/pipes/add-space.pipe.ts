import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addSpace'
})
export class AddSpacePipe implements PipeTransform {

  transform(value: any[] = []): string | any[] {
    if (value && value.length > 1) {
      return value.join(', ');
    }

    return value;
  }

}
