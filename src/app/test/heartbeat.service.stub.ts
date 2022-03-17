import { of, Observable } from 'rxjs';

export const heartbeatServiceStub = {
  getDevicesCount(): Observable<number> {
    return of(0);
  },
  getTagsCount(): Observable<number> {
    return of(0);
  },
  getMessagesPerSecond(): Observable<number> {
    return of(0);
  },
  getFlows(): Observable<number> {
    return of(0);
  },
  getFunctions(): Observable<number> {
    return of(0);
  },
  getApplications(): Observable<number> {
    return of(0);
  },
  getLoopCloud(): Observable<number> {
    return of(0);
  },
  getIntegrations(): Observable<number> {
    return of(0);
  },
  getRemoteNetworks(): Observable<number> {
    return of(0);
  },
};
