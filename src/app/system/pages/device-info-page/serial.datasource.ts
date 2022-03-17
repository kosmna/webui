import { DataSource } from '@angular/cdk/collections';
import { DeviceManagementService } from '@app/system/services';
import { Observable } from 'rxjs';
import { SerialInterface } from '@app/system/models';

export class SerialDataSource extends DataSource<any> {
  get length(): number {
    return this._dmService.serialInterfaces.value.length;
  }
  constructor(private _dmService: DeviceManagementService) {
    super();
  }

  connect(): Observable<SerialInterface[]> {
    this._dmService.getSerialInterfaces();
    return this._dmService.serialInterfaces;
  }

  disconnect(): void {
  }

}
