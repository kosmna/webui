import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject ,  Observable ,  merge, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { CloudConnector } from '@app/datahub/models';

export class CloudConnectorDataSource extends DataSource<CloudConnector> {
  private _filterStream$ = new BehaviorSubject('');
  private readonly _data$: BehaviorSubject<CloudConnector[]> = new BehaviorSubject([]);
  get filter(): string { return this._filterStream$.value; }
  set filter(filter: string) { this._filterStream$.next(filter); }


  set data(res: CloudConnector[]) {
    this._data$.next(res);
  }

  get data(): CloudConnector[] {
    return this._data$.value;
  }


  constructor(
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
  }

  getSortedData(): CloudConnector[] {

    const data = this.data.slice();

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }


    return data.sort((a, b) => {
      let propA  = '';
      let probB = '';
      if (this._sort.active === 'status') {

        [propA, probB ] = [a['state']['status'], b['state']['status']];
      } else {
        [propA, probB ] = [a[this._sort.active], b[this._sort.active]];
      }

      return propA.localeCompare(probB, undefined,  { numeric: true, sensitivity: 'base' }) * (this._sort.direction === 'asc' ? 1 : -1);

    });
  }

  /**
   * Required method for Material DataTable DataSource implementation
   * Creates an observable that emit on data or filter changes
   *
   * @returns {Observable}
   * @memberof CloudConnectorSource
   */
  connect() {

    const dataStreams = [
      this._data$,
      this._filterStream$,
      this._paginator.page,
      this._sort.sortChange,
    ];

    return merge(...dataStreams)
    .pipe(
      map(() => {
        const data = this.getSortedData();
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      })
    );
  }

  /**
   * Method that executes on table disconnection
   *
   * @memberof CloudConnectorSource
   */
  disconnect() { }
}
