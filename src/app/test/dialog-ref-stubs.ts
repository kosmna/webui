import { Observable ,  of } from 'rxjs';

export const dialogRefStub = {
  afterClose(): Observable<any> {
    return of({});
  }
};
