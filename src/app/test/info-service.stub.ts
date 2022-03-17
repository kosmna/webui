import { of, Observable } from 'rxjs';

export const infoServiceStub = {
  getDeviceFriendlyName(): Observable<string> {
    return of('Demo');
  },
};
