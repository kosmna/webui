import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject ,  merge ,  of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { User } from '@app/core';

export class UserDataSource extends DataSource<any> {
  private readonly _users$ = new BehaviorSubject<User[]>([]);

  get users() { return this._users$.getValue(); }
  set data(arr: User[]) {
    this._users$.next(arr);
  }
  constructor(
    private _sort: MatSort,
    private _paginator: MatPaginator
  ) {
    super();
  }

  getSortedData(): User[] {
    const data = this.users.slice();
    if (!this._sort || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'username' : [propertyA, propertyB] = [a.username, b.username]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
  connect() {
    const dataStream = [
      this._users$,
      this._sort.sortChange,
      this._paginator.page
    ];
    return merge(...dataStream)
    .pipe(
      flatMap(() => {
        const data = this.getSortedData();
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return of(data.splice(startIndex, this._paginator.pageSize));
      })
    );
  }

  disconnect() { }

  /**
   * Update datasource on user creation
   *
   * @param {any} user
   * @memberof UserDataSource
   */
  add(user) {
    const newData = this.users;
    newData.push(user);
    this._users$.next(newData);
  }

  /**
   * Update datasource on user edit
   *
   * @param {User} user
   * @memberof UserDataSource
   */
  update(user: User) {
    const index = this.users.findIndex(element => element.username === user.username);
    this.users[index] = user;
    this._users$.next(this.users);
  }

  /**
   * Update datasource on user remove
   *
   * @param {User} user
   * @memberof UserDataSource
   */
  delete(user: User) {
    const index = this.users.findIndex(element => element.username === user.username);
    this.users.splice(index, 1);
    this._users$.next(this.users);
  }
}
