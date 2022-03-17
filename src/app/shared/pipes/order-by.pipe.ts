import { Pipe, PipeTransform } from '@angular/core';
/**
 * Order by orders array of objects
 * Name of the property is required
 * No built in PIPES: https://angular.io/guide/pipes#built-in-pipes
 * @export
 * @class OrderByPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {

  transform(value: { [s: string]: any; }[] , prop: string): any {
    value = value || [];
    value.sort((a: { [s: string]: any; }, b: { [s: string]: any; } ) => {
      if (a[prop] < b[prop] ) {
        return -1;
      } else if (a[prop] > b[prop] ) {
        return 1;
      } else {
        return 0;
      }
    });

    return value;
  }

}
