import { ApiVersion } from '@app/system/models/api-version';
import { BehaviorSubject ,  Observable ,  of } from 'rxjs';

export const statusServiceStub = {
  get apiList() {
    return [
      {
        name: 'Dashboard PM API',
        url: '/pmapi',
        isRespond: false,
        serverVersion: {
          version: '1',
          git: 'HEAD'
        }
      }
    ];
  },
  apiVersion(endpoint: ApiVersion) {
    return of(endpoint);
  }
};
