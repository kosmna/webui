import { Observable ,  of } from 'rxjs';
import { ZerotierNetwork, ZerotierNetworkStatus, ZerotierNetworkType } from '@app/system';

const exampleData: ZerotierNetwork[] = [
  {
    addrs: ['192.168.1.254'],
    device: 'device',
    id: 'id',
    mac: 'mac',
    name: 'name',
    status: 'OK',
    type: ZerotierNetworkType.PUBLIC
  }
];

export const deviceManagementServiceStub = {
  joinZerotierNetwork() {
    return of(true);
  },
  leaveZerotierNetwork() {
    return of(true);
  },
  getZerotierNetworks() {
    return of(exampleData);
  },
  backupConfiguration() {
    return of({});
  },
  backupConfigurationTemplate() {
    return of({});
  }
};
