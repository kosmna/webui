import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject ,  Observable  ,  merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { OmaBinding } from '@app/cosmyna/models';

export class OmaDataSource extends DataSource<any> {
  dataLength = 0;

  // These keep track of changes in each filter. When a filter is updated, the changes propagate.
  constructor(
    private bindings: BehaviorSubject<OmaBinding[]>,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
  }

  getSortedData(): any[] {
    const data = this.bindings.getValue().slice();

    this.dataLength = data.length;

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      [propertyA, propertyB] = [a[this._sort.active], b[this._sort.active]];

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }

  connect(): Observable<OmaBinding[]> {
    // Keeps track of the list of things that can trigger change events in the observable
    const displayDataChanges = [
      this.bindings,
      this._paginator.page,
      this._sort.sortChange
    ];

    // Returns a new list of data each time one of the above Observables / Subjects has a new value
    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          const data = this.getSortedData();
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          return data.splice(startIndex, this._paginator.pageSize);
        })
      );
  }

  disconnect() { }
}
