import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { DeviceManagementService } from '@app/system/services';
import { DeviceStatus } from '@app/system/models';

export class DeviceStatusSource extends DataSource <DeviceStatus> {
  constructor(private _dm: DeviceManagementService) {
    super();
  }

  connect(): Observable <DeviceStatus[]> {
    return this._dm.getDeviceStatus();
  }

  disconnect() {}
}
