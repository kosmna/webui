import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Marketplace,
  MarketplaceApp,
  MarketPlaceID,
  ConfigInput,
  NetworkInformation,
  PsInfo,
  AppStatistics,
  Registry,
  Repository,
  Tag,
  Volume,
} from '@app/marketplace/models';
import { DemoAuthService, ServerVersion, LocaleService } from '@app/core';
import { LoaderService } from '@app/loop-loader';
import { NotificationsService } from '@app/loop-notifications/services';

/**
 * A service for accessing the Demo Marketplace Applications API
 */
@Injectable()
export class EdgeAppService {
  get applications() {
    return this.applicationsStreamSource$.value;
  }
  _currentMarketPlace: Marketplace = {
    id: '',
    branch: '',
    name: '',
    private: false,
    url: '',
  };
  test = 0;

  private appsDataStoreSource$: BehaviorSubject<
    MarketplaceApp[]
  > = new BehaviorSubject(this.generateSkeletonApps());
  get appsDataStore$(): BehaviorSubject<MarketplaceApp[]> {
    return this.appsDataStoreSource$;
  }
  private errorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>(
    null
  );
  private readonly applicationsStreamSource$ = new BehaviorSubject<
    MarketplaceApp[]
  >([]);
  get applicationsStream$() {
    return this.applicationsStreamSource$;
  }

  private baseUrl = '/apps';
  get currentMarketPlace() {
    return this._currentMarketPlace;
  }
  set currentMarketPlace(marketplace: Marketplace) {
    this._currentMarketPlace = marketplace;
  }

  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService,
    private _loadingService: LoaderService,
    private _notifyService: NotificationsService
  ) {}

  /**
   * Fetch list of applications
   *
   * @memberof EdgeAppService
   */
  getApplications() {
    const url = this._localeService.localizeUrl(this.baseUrl);
    this._DemoAuthService
      .httpClientGet<MarketplaceApp[]>(url)
      .subscribe(applications =>
        this.applicationsStreamSource$.next(applications)
      );
  }

  loadApplications(): Observable<MarketplaceApp[]> {
    return this._DemoAuthService.httpClientGet<MarketplaceApp[]>(
      this._localeService.localizeUrl(this.baseUrl)
    );
  }

  /**
   * Get details for application
   *
   * @param {string} appId - Application ID
   * @returns {Observable<MarketplaceApp>} - An observable that emits application details
   * @memberof EdgeAppService
   */
  getApplicationDetail(appId: string): Observable<MarketplaceApp> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/${appId}`);
    return this._DemoAuthService.httpClientGet<MarketplaceApp>(url);
  }

  /**
   * Get application log
   *
   * @param {string} appId - Application ID
   * @returns {Observable<string>} - An observable that emits application log text.
   * @memberof EdgeAppService
   */
  getAppLog(appId: string): Observable<string> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/logs`
    );
    return this._DemoAuthService.httpClientGet<string>(url, {
      responseType: 'text',
    });
  }

  /**
   * Get application statistics
   *
   * @param {string} appId - Application ID
   * @returns {Observable<AppStatistics[]>} - An observable that emits application statistics
   * @memberof EdgeAppService
   */
  getAppStats(appId: string): Observable<AppStatistics[]> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/stats`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Perform long polling for application statistics
   *
   * @param {string} appId - Application ID
   * @returns {Observable<AppStatistics[]>} - An observable that emits application statistics
   * @memberof EdgeAppService
   */
  pollAppStats(appId: string): Observable<AppStatistics[]> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/stats/poll`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Get application network information
   *
   * @param {string} appId - Application ID
   * @returns {Observable<NetworkInformation[]>} - An observable that emits application network information
   * @memberof EdgeAppService
   */
  getAppNetworkInfo(appId: string): Observable<NetworkInformation[]> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/network-info`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Return compose ps information
   *
   * @param {string} appId - Application ID
   * @returns {Observable<PsInfo[]>} - An observable that emits application PS information
   * @memberof EdgeAppService
   */
  getAppProcessInfo(appId: string): Observable<PsInfo[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/${appId}/ps`);
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Starts the application with specified ID
   *
   * @param {string} appId - Application ID
   * @returns {Observable<any>} - An observable that emits operation results, in this case null.
   * @memberof EdgeAppService
   */
  startApplication(appId: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/start`
    );
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Stops the application with specified ID
   *
   * @param {string} appId - Application ID
   * @returns {Observable<any>} - An observable that emits operation results, in this case null
   * @memberof EdgeAppService
   */
  stopApplication(appId: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/${appId}/stop`
    );
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Uninstall the application with specified ID
   *
   * @param {string} appId - Application ID
   * @returns {Observable<any>} - An observable that emits operation results, in this case null
   * @memberof EdgeAppService
   */
  uninstallApplication(appId: string): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/${appId}`);
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Get list of marketplaces defined.
   *
   * @returns {Observable< Marketplace[]>} - An observable that emits marketplaces.
   * @memberof EdgeAppService
   */
  getListOfMarketplaces(): Observable<Marketplace[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/marketplaces`);
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Create a marketplace
   *
   * @param {Marketplace} marketplace - Marketplace info
   * @returns {Observable<MarketPlaceID>} - An observable that emits marketplace identifier
   * @memberof EdgeAppService
   */
  postCreateMarketplace(marketplace: Marketplace): Observable<MarketPlaceID> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/marketplaces`);
    return this._DemoAuthService.httpClientPost<any>(url, marketplace);
  }

  /**
   * Delete marketplace
   *
   * @param {string} id - Marketplace ID
   * @returns {Observable<any>} - An observable that emits operation results, in this case null.
   * @memberof EdgeAppService
   */
  deleteMarketplace(id: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/marketplaces/${id}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Sync marketplace
   *
   * @param {string} id - Marketplace ID
   * @returns {Observable<any>} - An observable that emits operation results, in this case null
   * @memberof EdgeAppService
   */
  putSyncMarketplace(id: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/marketplaces/${id}/sync`
    );
    return this._DemoAuthService.httpClientPut(url, id);
  }

  /**
   * First syncs marketplace then gets marketplace apps
   */
  returnApps(marketplace: Marketplace): void {
    const currentMarketplace = this.currentMarketPlace;
    const id = marketplace.id;
    if (marketplace.id !== currentMarketplace.id) {
      this.appsDataStoreSource$.next(this.generateSkeletonApps());
      this.currentMarketPlace = marketplace;
    }
    this.getMarketplaceApps(id).subscribe((apps: MarketplaceApp[]) => {
      this.appsDataStoreSource$.next(apps);
    });
  }

  // TODO Delete if this api call isnt needed anymore

  // getMarketplaceByID(id: string): Observable<Marketplace> {
  //   if (this.marketplaces) {
  //     const marketplace = this.marketplaces.find(x => x.id === id);
  //     if (marketplace) {
  //       return of(marketplace);
  //     }
  //   }

  //   const url = this._localeService.localizeUrl(this.baseUrl + '/marketplaces/' + id);
  //   return this._DemoAuthService.httpGet(url)
  //     .map(res => res.json() as Marketplace);
  // }

  /**
   * Get marketplace applications
   *
   * @param {string} marketplaceID - Marketplace ID
   * @returns {Observable<MarketplaceApp[]>} - An observable that emits marketplace applications.
   * @memberof EdgeAppService
   */
  getMarketplaceApps(marketplaceID: string): Observable<MarketplaceApp[]> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/marketplaces/${marketplaceID}/apps`
    );
    return this._DemoAuthService.httpClientGet<MarketplaceApp[]>(url).pipe(
      map(apps => {
        apps.forEach(app => (app.image = 'data:image/png;base64,' + app.image));
        return apps;
      })
    );
  }

  /**
   * Get marketplace application detail.
   *
   * @param {string} marketplaceID - Marketplace ID
   * @param {string} appID - Application ID
   * @returns {Observable<MarketplaceApp>} - An observable that emits apllication details
   * @memberof EdgeAppService
   */
  getMarketplaceAppDetails(
    marketplaceID: string,
    appID: string
  ): Observable<MarketplaceApp> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/marketplaces/${marketplaceID}/apps/${appID}`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Launch an application
   *
   * @param {string} marketplaceID - Marketplace ID
   * @param {string} appID - Application ID
   * @param {string} versionID - Application version
   * @param {object} body - Payload
   * @returns {Observable<any>} - An observable that emits operation results, in this case null
   * @memberof EdgeAppService
   */
  launchMarketplaceApp(
    marketplaceID: string,
    appID: string,
    versionID: string,
    body: object
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${
        this.baseUrl
      }/marketplaces/${marketplaceID}/apps/${appID}/versions/${versionID}`
    );
    return this._DemoAuthService.httpClientPost(url, body);
  }

  /**
   * Get application readme
   *
   * @param {string} marketplaceID - Marketplace ID
   * @param {string} appID - Application ID
   * @param {string} version - Application version
   * @returns {Observable<string>} - An observable that emits readme string
   * @memberof EdgeAppService
   */
  getAppReadme(
    marketplaceID: string,
    appID: string,
    version: string
  ): Observable<string> {
    const options = { responseType: 'text' };
    const url = this._localeService.localizeUrl(
      `${
        this.baseUrl
      }/marketplaces/${marketplaceID}/apps/${appID}/versions/${version}/readme`
    );
    return this._DemoAuthService.httpClientGet(url, options);
  }

  /**
   * Get application configuration parameters
   *
   * @param {string} marketplaceID - Marketplace ID
   * @param {string} appID - Application ID
   * @param {string} version - Application version
   * @returns {Observable<ConfigInput[]>} - An observable that emits application configuration
   * @memberof EdgeAppService
   */
  getAppParams(
    marketplaceID: string,
    appID: string,
    version: string
  ): Observable<ConfigInput[]> {
    const url = this._localeService.localizeUrl(
      `${
        this.baseUrl
      }/marketplaces/${marketplaceID}/apps/${appID}/versions/${version}/params`
    );
    return this._DemoAuthService.httpClientGet(url);
  }
  // TODO Delete if this api call isnt needed anymore
  getServerVersion(): Observable<ServerVersion> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/version`);
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Get registries list
   *
   * @returns {Observable<Registry[]>}
   * @memberof EdgeAppService
   */
  registries(): Observable<Registry[]> {
    const url = this._localeService.localizeUrl(this.baseUrl + '/registries');
    return this._DemoAuthService.httpClientGet<Registry[]>(url);
  }

  /**
   * Create a new registry
   *
   * @param {Registry} registry
   * @returns {Observable}
   * @memberof EdgeAppService
   */
  createRegistry(registry: Registry) {
    const url = this._localeService.localizeUrl(this.baseUrl + '/registries');
    return this._DemoAuthService.httpClientPost<Registry>(url, registry);
  }

  /**
   * Delete registry
   *
   * @param {Registry} registry
   * @returns {Observable}
   * @memberof EdgeAppService
   */
  removeRegistry(registry: Registry) {
    const url = this._localeService.localizeUrl(
      this.baseUrl + `/registries/${registry.id}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Update registry
   *
   * @param {Registry} registry
   * @returns {Observable}
   * @memberof EdgeAppService
   */
  updateRegistry(registry: Registry) {
    const url = this._localeService.localizeUrl(
      this.baseUrl + `/registries/${registry.id}`
    );
    return this._DemoAuthService.httpClientPut(url, registry);
  }

  /**
   * Get repositories for the selected registry
   *
   * @param {Registry} registry
   * @returns {Observable<Repository[]>}
   * @memberof EdgeAppService
   */
  registryRepositories(registry: Registry): Observable<Repository[]> {
    const url = this._localeService.localizeUrl(
      this.baseUrl + `/registries/${registry.id}/repositories`
    );
    return this._DemoAuthService.httpClientGet<Repository[]>(url);
  }

  /**
   * Get repoeitory tag information
   *
   * @param {Registry} registry
   * @param {Repository} repository
   * @param {string} tag
   * @returns {Observable<Tag>}
   * @memberof EdgeAppService
   */
  repositoryTagInfo(
    registry: Registry,
    repository: Repository,
    tag: string
  ): Observable<Tag> {
    const url = this._localeService.localizeUrl(
      this.baseUrl +
        `/registries/${registry.id}/repositories/${repository.name}/tags/${tag}`
    );
    return this._DemoAuthService.httpClientGet<any>(url);
  }

  getDefaultMarketPlace(): Observable<any> {
    const url = this._localeService.localizeUrl(
      this.baseUrl + `/marketplaces/default`
    );
    return this._DemoAuthService.httpClientPost<any>(url, null);
  }

  getVolumes(): Observable<Volume[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/volumes`);
    return this._DemoAuthService
      .httpClientGet<Volume[]>(url)
      .pipe(
        map(volumes =>
          volumes.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          )
        )
      );
  }

  deleteVolume(volume: Volume): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this.baseUrl}/volumes/${volume.name}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  private generateSkeletonApps(): MarketplaceApp[] {
    const apps = [];
    for (let i = 0; i < 8; i++) {
      apps.push({
        name: 'Loading',
        description: 'Loading description',
        id: 'loading',
      });
    }
    return apps;
  }
}
