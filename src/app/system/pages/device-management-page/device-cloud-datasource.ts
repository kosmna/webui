import { DataSource } from '@angular/cdk/collections';
import {  Observable,  of } from 'rxjs';

import { DeviceMangCloud } from '@app/system/models';

export class DeviceCloudDataSource extends DataSource <DeviceMangCloud> {
  constructor(private _deviceCloud: DeviceMangCloud) {
    super();

  }

  connect(): Observable <DeviceMangCloud[]>  {
    return  of([this._deviceCloud]);
  }

  disconnect() {}
}
