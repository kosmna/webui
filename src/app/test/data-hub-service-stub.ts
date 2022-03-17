import { Observable ,  of } from 'rxjs';
import { CloudConnector, CloudConnectorStatus, DataHubNode, RawSub, StatsTopic, StatsTotal } from '@app/datahub/models';

const exampleCloudConnector: CloudConnector = {
  address: 'address',
  clientID: 'client id',
  id: 'id',
  name: 'name',
  port: 9001,
  scheme: 'tcp',
  topic: 'topic',
  username: 'username'
};
const Topics: StatsTopic[] = [
  {
      'dataVolumeKb': 675769296,
      'name': 'datahub:/xxx/yyy/zzz',
      'numMessages': 879068
    },
    {
      'dataVolumeKb': 675769296,
      'name': 'datahub:/xxx/yyy/zzz',
      'numMessages': 879068
    },
    {
      'dataVolumeKb': 675769296,
      'name': 'datahub:/xxx/yyy/zzz',
      'numMessages': 879068
    }
];
const Total_Topics: StatsTotal = {
  'dataVolumeKb': 675769296,
  'numMessages': 879068,
  'numTopics': 71
};

export const dataHubServiceStub = {
  getCloudConnectors(): Observable<CloudConnector[]> {
    return of([exampleCloudConnector]);
  },
  createCloudConnector(setup: CloudConnector): Observable<string> {
    return of('id');
  },
  getCloudConnectorPassword() {
    return of('password');
  },
  getRawSubs(): Observable<RawSub[]> {
    return of([]);
  },
  get  cloudConnectors$() { return of([]); },
  get cloudConnectors() { return []; },
  get rawSubscriptions$() { return of([]); },
  get rawSubscriptions() { return []; },
  getStats(): Observable<StatsTopic[]> {
    return of(Topics);
  },
  getStatsTotal(): Observable<StatsTotal> {
    return of(Total_Topics);
  },
  resetStats(): Observable<boolean> {
    return of(true);
  }
};
