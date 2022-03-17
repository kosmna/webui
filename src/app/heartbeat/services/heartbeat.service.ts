import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { DemoAuthService, LocaleService } from '@app/core';
import { map } from 'rxjs/operators';
import { InterceptorHttpParams } from '@app/core/classes';
import {
  ModuleStatuses,
  StorageUtilization,
  ResourcesUtilization,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class HeartbeatService {
  constructor(
    private _kosmynaAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) {}

  getDevicesCount(): Observable<number> {
    const url = this._localeService.localizeUrl(`/cosmyna/devices`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(devices => devices.length));
  }

  getTagsCount(): Observable<number> {
    const url = this._localeService.localizeUrl(`/cosmyna/registers`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(registers => registers.length));
  }

  getMessagesPerSecond(): Observable<number> {
    const url = this._localeService.localizeUrl(`/datahub/stats/totals`);
    return this._kosmynaAuthService
      .httpClientGet<{
        dataVolumeKb: number;
        numMessages: number;
        numTopics: number;
      }>(url)
      .pipe(map(value => value.numMessages));
  }

  getFlows(): Observable<number> {
    const url = this._localeService.localizeUrl(`/flows/flows`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(flows => flows.filter(flow => flow.type === 'tab').length));
  }

  getFunctions(): Observable<number> {
    return of(3);
  }

  getApplications(): Observable<number> {
    const url = this._localeService.localizeUrl(`/apps`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(applications => applications.length));
  }

  getLoopCloud(): Observable<number> {
    const url = this._localeService.localizeUrl(`/datahub/cloudconnectors`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(connectors => connectors.length));
  }

  getIntegrations(): Observable<number> {
    const url = this._localeService.localizeUrl(`/cc/instances`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(integrations => integrations.length));
  }

  getRemoteNetworks(): Observable<number> {
    const url = this._localeService.localizeUrl(`/dm/zerotier/networks`);
    return this._kosmynaAuthService
      .httpClientGet<any[]>(url)
      .pipe(map(networks => networks.length));
  }

  getApiStatus(url: string): Observable<ModuleStatuses> {
    return this._kosmynaAuthService
      .httpClientGet<any>(this._localeService.localizeUrl(`${url}/version`), {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [502] }),
      })
      .pipe(map(_ => ModuleStatuses.Normal));
  }

  getStorageUtilization(): Observable<StorageUtilization> {
    return this._kosmynaAuthService.httpClientGet<StorageUtilization>(
      this._localeService.localizeUrl(`/dm/deviceinfo/stor`)
    );
  }

  getResourcesUtilization(): Observable<ResourcesUtilization> {
    return this._kosmynaAuthService.httpClientGet<ResourcesUtilization>(
      this._localeService.localizeUrl(`/stats`)
    );
  }
}
