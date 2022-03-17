import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcaseToHuman'
})
export class CamelcaseToHumanPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    if (value) {
     return value.slice(0, 1).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1');
    } else {
      return null;
    }
  }

}
