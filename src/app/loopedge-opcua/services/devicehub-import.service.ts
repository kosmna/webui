import { Injectable } from '@angular/core';
import { LocaleService, DemoAuthService } from '@app/core';
import { Observable } from 'rxjs';
import { Device, DeviceRegister } from '@app/cosmyna/models';

@Injectable({
  providedIn: 'root',
})
export class cosmynaImportService {
  private _baseUrl = '/cosmyna';
  constructor(
    private _localeService: LocaleService,
    private _DemoAuthService: DemoAuthService
  ) {}

  getDevices(): Observable<Device[]> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/devices`);
    return this._DemoAuthService.httpClientGet<Device[]>(url);
  }

  getRegisters(): Observable<DeviceRegister[]> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/registers`);
    return this._DemoAuthService.httpClientGet<DeviceRegister[]>(url);
  }
}
