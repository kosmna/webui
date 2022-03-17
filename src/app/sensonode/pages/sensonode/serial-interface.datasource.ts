import { DataSource } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { SensonodeInterface } from '@app/sensonode/models';

export class SerialIDataSource extends DataSource<any> {
  constructor(private _sensonodeInterfaces: Observable<SensonodeInterface[]>) {
    super();
  }

  connect(): Observable<SensonodeInterface[]> {
    return this._sensonodeInterfaces;
  }

  disconnect(): void {}
}
