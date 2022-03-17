import { DataSource } from '@angular/cdk/table';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject ,  Observable ,  merge } from 'rxjs';
import { map, distinctUntilChanged, skip } from 'rxjs/operators';
import {_isNumberValue} from '@angular/cdk/coercion';

import { DeviceRegister } from '@app/cosmyna/models';
import { Subject } from 'rxjs/Subject';

export class RegistersDataSource extends DataSource<any> {
  dataLength = 0;

  private dataLength$: Subject<number> = new Subject();
  private _data$: BehaviorSubject<DeviceRegister[]> = new BehaviorSubject([]);
  /**
   * Set device registers Data
   */
  set data(regArr: DeviceRegister[] ) {
    this._data$.next(regArr);
  }

  get data(): DeviceRegister[] {
    return this._data$.getValue();
  }

  private _inputFilterChange$: BehaviorSubject<string> = new BehaviorSubject('');
  get inputFilter() {
    return this._inputFilterChange$.value;
  }
  set inputFilter(value: string) {
    this._inputFilterChange$.next(value);
  }
  private _deviceFilterChange$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  get deviceFilter() {
    return this._deviceFilterChange$.value;
  }
  set deviceFilter(value: string[]) {
    this._deviceFilterChange$.next(value);
  }

  private _typeFilterChange$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  get typeFilter() {
    return this._typeFilterChange$.value;
  }
  set typeFilter(value: string[]) {
    this._typeFilterChange$.next(value);
  }

  constructor(
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
  }

  sortAlgo(array): DeviceRegister[] {
    const len = array.length;
    if (len < 2) {
      return array;
    }
    const pivot = Math.ceil(len / 2);
    return this.merge(this.sortAlgo(array.slice(0, pivot)), this.sortAlgo(array.slice(pivot)));
  }




  getSortedData(): DeviceRegister[] | null {

    let data = this.data.slice();

    if (this.deviceFilter.length > 0 ) {
      data = data.filter(x => this.deviceFilter.includes(x.deviceId));
    }

    if (this.typeFilter.length > 0 ) {
      data = data.filter(x =>  this.typeFilter.includes(x.valueType));
    }

    if (this.inputFilter !== '') {
      // TODO figure out why include doesn't match with strings with underscores ex: A_ !== A_
      data = data.filter(x => {
        const oma = x.oma ? `${x.oma.objectId}${x.oma.instanceId}${x.oma.resourceId}` : 'none';
        return  x.description.toLowerCase().indexOf(this.inputFilter) === 0
        || x.tagName.toLowerCase().indexOf(this.inputFilter) === 0
        || x.name.toLowerCase().indexOf(this.inputFilter) === 0
        || `${x.pollingInterval}`.indexOf(this.inputFilter) === 0
        || `${x.dbNumber}`.indexOf(this.inputFilter) === 0
        || x.valueType.toLocaleLowerCase().indexOf(this.inputFilter) === 0
        || oma.indexOf(this.inputFilter) === 0;
      });
    }

    this.dataLength = data.length;

    const active = this._sort.active;
    const direction = this._sort.direction;

    if (!active || direction === '') {
      return data;
    }

    return this.sortAlgo(data);

  }

  connect(): Observable<DeviceRegister[]> {
    // Keeps track of the list of things that can trigger change events in the observable
      const displayDataChanges = [
        this._data$,
        // Prevent Observables from emitting if values are the same or empty
        this._deviceFilterChange$
        .pipe(
          distinctUntilChanged((x, y) => x === y ),
        // on Initial load observable emits empty array
          skip(1)
        ),
        this._inputFilterChange$
        .pipe(
        // on initial load observable emits empty string
          skip(1),
          distinctUntilChanged((x, y) => x === y ),
        ),
        this._paginator.page,
        this._sort.sortChange
    ];

    // Returns a new list of data each time one of the above Observables / Subjects has a new value
    return merge(...displayDataChanges)
      .pipe(
        map(() => {
          const data = this.getSortedData();
          this.dataLength$.next(data.length);
          const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
          return data.splice(startIndex, this._paginator.pageSize);
        }),
      );
  }
  /**
   * Table Change Events Only use for
   * Development
   *
   * @returns {Observable<any>}
   * @memberof RegistersDataSource
   */
  tableChange(): Observable<any> {
    const displayDataChanges = [
      this._deviceFilterChange$
      .pipe(
        map((res) => 'deviceFilter ' + res),
      ),
      this._typeFilterChange$
      .pipe(
        map((res) => 'TypeFilter ' + res),
      ),
      this._inputFilterChange$
      .pipe(
        map((res) => 'InputFilter ' + res),
      ),
      this._paginator.page
      .pipe(
        map(() => 'pagination')
      ),
      this._sort.sortChange
      .pipe(
        map(() => 'sort Called')
      ),
      this.dataLength$
      .pipe(
        map((res) => `Data Changed ${res}`),
      )
    ];

    return merge(...displayDataChanges);

  }

  disconnect() { }
  /**
   *  Merge sort Algorithm, native sort method too slow for large data sets.
   * @param left
   * @param right
   */
  private merge(left: any[], right: any[]): any[] {
    const result = [];
    const sortAsc: boolean = this._sort.direction === 'asc';
    const key = this._sort.active;
    let il = 0;
    let ir = 0;

    while (il < left.length && ir < right.length ) {
      if (this.setValue(left[il], key ) < this.setValue(right[ir], key) === sortAsc ) {
        result.push(left[il++]);
      } else {
        result.push(right[ir++]);
      }
    }

    while (il < left.length) {
      result.push(left[il++]);
    }

    while (ir < right.length) {
      result.push(right[ir++]);
    }
    return result;

  }

  private setValue(data: any, key: string): string | number | null {
    if (key === 'omaBinding') {
      key = 'objectId';
    }
    const value: any = data[key];

    if (value === null || value === undefined) {
      return null;
    }

    return _isNumberValue(value) ? Number(value) : value.toLowerCase();
  }
}


