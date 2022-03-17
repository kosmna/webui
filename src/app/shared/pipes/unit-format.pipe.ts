import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitFormat'
})
export class UnitFormatPipe implements PipeTransform {

  transform(value: number, multiplier: string): number {
    value = multiplier === 'K' ?
      value / 1000 : multiplier === 'M' ?
        value / 1000 / 1000 : multiplier === 'G' ?
          value / 1000 / 1000 / 1000 : value;
    return parseFloat(value.toPrecision(2));
  }

}
