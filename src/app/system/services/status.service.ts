import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiVersion } from '@app/system/models';
import { environment } from '@env';
import { DemoAuthService, ServerVersion, LocaleService } from '@app/core';
import { map, catchError } from 'rxjs/operators';
import { InterceptorHttpParams } from '@app/core/classes';
@Injectable()
export class StatusService {
  readonly appName: string = environment.productName;
  private readonly liteUrls: string[] = ['/datahub', '/auth', '/webui'];
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) {}

  get apiList(): Array<ApiVersion> {
    let apiVersionsArr = [
      // {
      //   name: 'Dashboard PM API',
      //   url: '/pmapi',
      //   isRespond: false
      // },
      {
        name: 'DataHub API',
        url: '/datahub',
        isRespond: false,
      },
      {
        name: 'cosmyna API',
        url: '/cosmyna',
        isRespond: false,
      },
      {
        name: 'Device Management API',
        url: '/dm',
        isRespond: false,
      },
      {
        name: 'Marketplace API',
        url: '/apps',
        isRespond: false,
      },
      {
        name: 'Authentication API',
        url: '/auth',
        isRespond: false,
      },
      {
        name: 'FTP API',
        url: '/ftp',
        isRespond: false,
      },
      {
        name: 'CC API',
        url: '/cc',
        isRespond: false,
      },
      {
        name: `${this.appName} UI`,
        url: '/webui',
        isRespond: true,
      },
      {
        name: 'OPC UA API',
        url: '/opcua',
        isRespond: false,
      },
      {
        name: 'LWM2M API',
        url: '/lwm2m',
        isRespond: false,
      },
    ];
    if (environment.lite) {
      apiVersionsArr = apiVersionsArr.filter(b =>
        this.liteUrls.includes(b.url)
      );
    }
    return apiVersionsArr;
  }

  /**
   * Fetch API version
   *
   * @param {ApiVersion} endpoint
   * @returns {Observable<ApiVersion>}
   * @memberof StatusService
   */
  apiVersion(endpoint: ApiVersion): Observable<ApiVersion> {
    const url =
      endpoint.url === '/webui'
        ? './assets/version.json'
        : this._localeService.localizeUrl(endpoint.url + '/version');
    return this._DemoAuthService.httpClientGet<ServerVersion>(url, {
      params: new InterceptorHttpParams({ statusCodesToIgnore: [502]})
    }).pipe(
      map(result => {
        endpoint.isRespond = true;
        endpoint.serverVersion = result;
        return endpoint;
      }),
      catchError(error => {
        return of(endpoint);
      })
    );
  }
}
