import { of ,  Observable } from 'rxjs';

export const kosmynaCcServiceStub = {
  getProviders(): Observable<any[]> {
    return of([]);
  },
  getInstances(): Observable<any[]> {
    return of([]);
  },
  getConnectorSubscriptions(instanceId: string) {
    return of([]);
  },
};
