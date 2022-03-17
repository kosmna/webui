import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deviceIdToName'
})
export class DeviceIdToNamePipe implements PipeTransform {

  transform(value: string, deviceArr: any[]): any {
    let find = value;
    if (value && deviceArr) {
      find = deviceArr.find((x) => x.id === value).name;
    }

    return find;
  }

}
