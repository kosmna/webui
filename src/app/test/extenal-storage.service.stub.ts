import { of } from 'rxjs/observable/of';

export const externalStorageServiceStub = {
  getMountPoints() {
    return of([]);
  },
};
