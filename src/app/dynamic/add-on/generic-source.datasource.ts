import { MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject ,  Observable ,  merge } from 'rxjs';
import { flatMap } from 'rxjs/operators';
export class GenericSource extends DataSource<any> {
  length = 0;

  private _dataChanged$ = new BehaviorSubject(true);
  set dataChanged(newValue: boolean) {
    this._dataChanged$.next(newValue);
  }


  constructor(
    private _observable: Observable<any>
  ) {
    super();
    this.connect().subscribe(value => this.length = value.length);
  }

  connect() {
    const observables = [
      this._observable,
      this._dataChanged$
    ];

    return merge(...observables)
      .pipe(
        flatMap(() => this._observable)
      );
  }

  disconnect() { }
}
