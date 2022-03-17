import { DataSource } from '@angular/cdk/collections';
import { Observable ,  of } from 'rxjs';

import { DeviceObject, FlatResource } from '@app/system/models';

export class ObjectsDataSource extends DataSource <FlatResource> {
  constructor(
    public _divceObjectData: DeviceObject) {
    super();

  }

  connect(): Observable <FlatResource[]>  {
    return  of(this._divceObjectData.data);
  }

  disconnect() {}
}
