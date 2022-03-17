import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';

import { DatahubService } from '@app/datahub/services';
import { RawSub } from '@app/datahub/models';

export class RawSubscriptionsDataSource extends DataSource<RawSub> {
  get length() {
    return this._dataHubService.rawSubscriptions$.value.length;
  }
  get filter(): string {
    return this._filterStream$.value;
  }
  set filter(filter: string) {
    this._filterStream$.next(filter);
  }
  get data() {
    return this._dataHubService.rawSubscriptions;
  }
  private _filterStream$ = new BehaviorSubject('');
  constructor(
    private _dataHubService: DatahubService,
    private _paginator: MatPaginator,
    private _sort: MatSort,
  ) {
    super();
  }

  sortData(): RawSub[] {
    const data = this._dataHubService.rawSubscriptions.slice();

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }


    return data.sort((a, b) => {
      let propA  = '';
      let probB = '';
      if (this._sort.active === 'cloudConnectorURI') {
        [propA, probB ] = [a.cloudConnector.uri, b.cloudConnector.uri ];
      } else if (this._sort.active === 'cloudConnectorName') {

        [propA, probB ] = [a.cloudConnector.name, b.cloudConnector.name ];

      } else if (this._sort.active === 'enabled') {
        [propA, probB ] = [a.enabled.toString(), b.enabled.toString() ];

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
   * @memberof RawSubscriptionSource
   */
  connect() {
    const dataStreams = [
      this._dataHubService.rawSubscriptions$,
      this._filterStream$,
      this._paginator.page,
      this._sort.sortChange
    ];

    return merge(...dataStreams).pipe(
      map(() => {
        const data = this.sortData();
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return data.splice(startIndex, this._paginator.pageSize);
      })
    );
  }

  /**
   * Method that executes on table disconnection
   *
   * @memberof RawSubscriptionSource
   */
  disconnect() {}
}
