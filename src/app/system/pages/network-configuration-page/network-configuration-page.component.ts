import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DeviceManagementService } from '@app/system/services';
import { NetworkConfig, ModemConfig } from '@app/system/models';
import { skipWhile, switchMap, finalize } from 'rxjs/operators';
import { ModemConfigDialogComponent } from '@app/system/components/modem-config-dialog/modem-config-dialog.component';
import { forkJoin, Observable } from 'rxjs';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-network-configuration-page',
  templateUrl: './network-configuration-page.component.html',
  styleUrls: ['./network-configuration-page.component.scss']
})
export class NetworkConfigurationPageComponent implements OnInit {
  interfaces: Array<NetworkConfig>;
  selectedInterface: NetworkConfig;
  hostname: string;
  modemConfigList: any[] = [];
  constructor(
    private _deviceManagementService: DeviceManagementService,
    private _dmDialog: MatDialog,
    private _i18n: I18n,
  ) { }

  ngOnInit(): void {
    this.getNetworkInterfaces()
    .pipe(
      finalize(() => {
        this.selectedInterface = this.interfaces[0];
      })
    )
    .subscribe((res) => {
      this.setInterface(res);
    });
    // Grab modem configs
    this.refreshModemConfigs();

  }
  /**
   *  Set interfaces list. Join fork calls two apis. First for interfaces and second for interfaces addresses
   *
   * @returns {Observable<NetworkConfig[]>}
   * @memberof NetworkConfigurationPageComponent
   */
  getNetworkInterfaces(): Observable<any[]> {
    return forkJoin(this._deviceManagementService.getAllNetworkConfigs(), this._deviceManagementService.getNetInterfaces());
  }
  /**
   * Update modem configs
   *
   * @memberof NetworkConfigurationPageComponent
   */
  refreshModemConfigs(): void {
    this._deviceManagementService.getModemConfigs()
    .subscribe((res) => {
      this.modemConfigList = res;
    });
  }



  /**
   * Set selected interface
   *
   * @param {NetworkConfig} networkInterface
   * @memberof NetworkConfigurationPageComponent
   */
  selectInterface(networkInterface: NetworkConfig): void {
    this.selectedInterface = networkInterface;
  }
  /**
   *  Open modem configuration dialog
   *
   * @param modeConfig
   */
  updateModeConfig(modeConfig: ModemConfig): void {
    const { imei } = modeConfig;

    const dialogRef = this._dmDialog.open(ModemConfigDialogComponent, {
      data: imei,
      disableClose: true,
      width: '60%',
    });

    dialogRef.afterClosed()
    .pipe(
      skipWhile((res) => res === false || res === null || res === undefined),
      switchMap((config) => {
        const { apn } = config;
        return this._deviceManagementService.updateModemConfig( imei, { apn });
      }),
    )
    .subscribe(_ => this.refreshModemConfigs());

  }
  /**
   * On Interface change update interfaces
   *
   * @memberof NetworkConfigurationPageComponent
   */
  interfaceChange(): void {
      this.getNetworkInterfaces()
      .subscribe((res) => this.setInterface(res));
  }
  /**
   * For template returns ipv6
   *
   * @param {*} i
   * @returns {string}
   * @memberof NetworkConfigurationPageComponent
   */
  getIPv6(i: NetworkConfig): string {
    return i.inet6.address || this._i18n('None');
  }
  /**
   *For template returns ipv4
   *
   * @param {*} i
   * @returns {string}
   * @memberof NetworkConfigurationPageComponent
   */
  getIPv4(i: NetworkConfig): string {
    return i.inet.address || this._i18n('None');
  }

  private setInterface(res) {
    // set interfaces model
    this.interfaces = res[0];
    // set address
    this.interfaces.map((inter) => {
      const i = res[1].find((x) => x.name === inter.name);
      const family = ['inet', 'inet6'];
      family.map((inet) => {
        let address = '';
        if ('addrs' in i) {
          address = i.addrs.find((b) => b.family === inet).address;
          inter[inet].address  = address;
        }
      });
    });
   }
}
