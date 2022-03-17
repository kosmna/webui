import { DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject } from 'rxjs';

import { SensorTable } from '@app/sensonode/models';
/**
 * Todo: Depreciated data source
 */
export class SensorDataSource extends DataSource<any> {
  private readonly _sensorList$ = new BehaviorSubject<SensorTable[]>([]);
  get sensorList(): Array<SensorTable> {
    return this._sensorList$.getValue();
  }
  set sensorList(v: SensorTable[]) {
    this._sensorList$.next(v);
  }
  constructor() {
    super();
  }

  connect(): Observable<SensorTable[]> {
    return this._sensorList$.asObservable();
  }

  disconnect(): void {
  }
}
