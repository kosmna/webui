import { of } from 'rxjs/observable/of';

export const kosmynaOpcuaServiceStub = {
  getHierarchy() {
    return of([]);
  },
  getSecurityModes() {
    return of([]);
  },
  getPolicies() {
    return of([]);
  },
  getUsers() {
    return of([]);
  },
  getStatus() {
    return of({ status: 'STOPPED' });
  },
  getCertificates() {
    return of([]);
  },
};
