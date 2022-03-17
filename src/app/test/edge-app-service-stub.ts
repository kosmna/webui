import {
  MarketplaceApp,
  Marketplace,
  MarketplaceDialogData,
  Registry,
  Repository,
} from '@app/marketplace/models';
import { of, Observable, BehaviorSubject } from 'rxjs';
const marketplaceList: Marketplace[] = [
  {
    branch: 'master',
    id: 'bdab4e8c-fa67-45de-9d99-2d026903661d',
    name: 'Litmus Automation Marketplace',
    private: false,
    url:
      'git@gitlabinternal.litmusloop.com:loop-edge/kosmyna-marketplace-catalog.git',
  },
];
const appsdataStore: MarketplaceApp[] = [
  {
    description:
      'The Strainer app cluster for handling large volume of noodles',
    id: 'bdab4e8c-fa67-45de-9d99-2d026903661d',
    image:
      'iVBORw0KGgoAAAANSUhEUgAAACsAAAAkCAYAAAAQC8MVAAAABHNCSVQICAgIfAhkiA...',
    installationScriptVersions: ['1', '3'],
    name: 'Demo Strainer',
  },
];

const marketplaces$: BehaviorSubject<Marketplace[]> = new BehaviorSubject(
  marketplaceList
);
const appsDataStore$: BehaviorSubject<MarketplaceApp[]> = new BehaviorSubject(
  appsdataStore
);
export const edgeAppServiceStub = {
  getApplications(): Observable<MarketplaceApp[]> {
    return of([]);
  },
  startApplication(appId: string) {
    return of(true);
  },
  stopApplication() {
    return of(true);
  },
  getListOfMarketplaces() {
    return of(marketplaceList);
  },
  getMarketplaceAppDetails() {
    const test = {
      description:
        'The Strainer app cluster for handling large volume of noodles',
      id: 'bdab4e8c-fa67-45de-9d99-2d026903661d',
      image:
        'iVBORw0KGgoAAAANSUhEUgAAACsAAAAkCAYAAAAQC8MVAAAABHNCSVQICAgIfAhkiA...',
      installationScriptVersions: ['1', '3'],
      name: 'Demo Strainer',
    };
    return of(test);
  },
  returnApps(id: string) {},
  marketplaces$,
  appsDataStore$,
  applications: [],
  get applicationsStream$() {
    return of([]);
  },
  getAppNetworkInfo() {
    return of([
      {
        id: 'applicationId',
        name: 'applicationName',
        networkEndpoint: [],
        networkInternal: {},
      },
    ]);
  },
  getAppProcessInfo(appId: string) {
    return of([]);
  },
  registries() {
    return of([]);
  },
  registryRepositories(registry: Registry) {
    return of([]);
  },
  repositoryTagInfo(registry: Registry, repository: Repository, tag: string) {
    return of(null);
  },
  getAppLog(id: string): Observable<string> {
    return of('Test logs');
  },
  getVolumes() {
    return of([]);
  },
};

export const dataDialog: MarketplaceDialogData = {
  marketplaceID: 'marketplaceID',
  app: appsdataStore[0],
};
