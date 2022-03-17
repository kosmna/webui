import { Injectable } from '@angular/core';
import { DemoAuthService } from './loop-edge-auth.service';
import { LocaleService } from './locale.service';
import { HostInfo } from '@app/system/models/host';
import { map } from 'rxjs/operators';
import { InterceptorHttpParams } from '../classes/interceptor-params';
import { SerialInterface } from '@app/system/models/serial-interface';
import { NetworkInterface } from '@app/system/models/network-interface';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) {}

  getDeviceFriendlyName() {
    const url = this._localeService.localizeUrl(`/dm/host/info`);
    return this._DemoAuthService
      .httpClientGet<HostInfo>(url, {
        params: new InterceptorHttpParams({ statusCodesToIgnore: [403, 500] }),
      })
      .pipe(map(hostInfo => hostInfo.description));
  }

  getDeviceSerialInterfaces() {
    const url = this._localeService.localizeUrl(`/dm/deviceinfo/ser`);
    return this._DemoAuthService.httpClientGet<SerialInterface[]>(url);
  }

  getDeviceNetworkInterfaces() {
    const url = this._localeService.localizeUrl(`/dm/deviceinfo/net`);
    return this._DemoAuthService.httpClientGet<NetworkInterface[]>(url);
  }
}
