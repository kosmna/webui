import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DemoAuthService, LocaleService } from '@app/core';
import { Iface , NetworkNode} from '@app/cosmyna/models';

@Injectable()
export class NetworkDiscoveryService {

  private _baseUrl = '/nd';
  constructor(
    private _locale: LocaleService,
    private _auth: DemoAuthService
  ) { }

  getIfaces(): Observable<Iface[]> {
    const url = this._locale.localizeUrl(`${this._baseUrl}/ifaces`);
    return this._auth.httpClientGet<Iface[]>(url);
  }

  disableIface(name: string): Observable<Object> {
    const url = this._locale.localizeUrl(`${this._baseUrl}/ifaces/${name}/disable`);
    return this._auth.httpClientPut(url, null);
  }

  enableIface(name: string): Observable<Object> {
    const url = this._locale.localizeUrl(`${this._baseUrl}/ifaces/${name}/enable`);

    return this._auth.httpClientPut(url, null);
  }

  getNodes(): Observable<NetworkNode[]> {
    const url = this._locale.localizeUrl(`${this._baseUrl}/nodes`);
    return this._auth.httpClientGet<NetworkNode[]>(url);
  }

  getNode(iface: string): Observable<NetworkNode[]> {
    const url = this._locale.localizeUrl(`${this._baseUrl}/nodes/${iface}`);
    return this._auth.httpClientGet<NetworkNode[]>(url);
  }
}
