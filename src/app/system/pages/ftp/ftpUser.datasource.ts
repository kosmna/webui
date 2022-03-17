import { DataSource } from '@angular/cdk/collections';
import { flatMap } from 'rxjs/operators';
import { MatSort } from '@angular/material';
import { merge ,  of } from 'rxjs';

import { FtpService } from '@app/system/services';
import { FtpUser } from '@app/system/models';



export class FtpUserDataSource extends DataSource <any> {
  constructor(private __ftpService: FtpService,
              private _sort: MatSort) {
    super();
  }

  getSortedData(): FtpUser[] {
    const data = this.__ftpService.ftpUsers.slice();
    if (!this._sort || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: boolean | string = '';
      let propertyB: boolean | string = '';

      switch (this._sort.active) {
        case 'username' : [propertyA, propertyB] = [a.username, b.username]; break;
        case 'disabled': [propertyA, propertyB] = [a.disabled, b.disabled]; break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
  connect() {
    const dataStream = [
      this.__ftpService.getUsers(),
      this._sort.sortChange,
    ];
    return merge(...dataStream)
      .pipe(
        flatMap(() => {
          const data = this.getSortedData();
          return of(data);
        })
      );
  }

  disconnect() { }

  get length() {
    return this.getSortedData().length;
  }
}
