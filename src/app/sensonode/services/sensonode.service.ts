import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';

import { DemoAuthService, LocaleService } from '@app/core';
import {
  SensorTable,
  PRNInfo,
  SensonodeInterface,
  RateCommand,
  AccelerationRate,
} from '@app/sensonode/models';
import {
  linkTable,
  dummyInterfaces,
  prnInfo,
  sensonodeSerialInterfaces,
} from '@app/sensonode/mock/dummyData';
import { SerialInterface, NetworkInterface } from '@app/system/models';

import { environment } from '@env';
import { InterceptorHttpParams } from '@app/core/classes';
import * as fromRoot from '@app/state';
import * as deviceActions from '@app/state/device.actions';
import { Store, select } from '@ngrx/store';

@Injectable()
export class SensonodeService implements OnDestroy {
  private _baseUrl = '/sensonodegold';
  private isConnectionLoadingSource$: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);

  private _connectionStatuses = [
    {
      name: 'ttyACM0',
      status: 'connected',
    },
    {
      name: 'ttyACM1',
      status: 'disconnected',
    },
  ];

  private _macAddress: string;
  private _serviceActive = true;

  get isConnectionLoading$(): BehaviorSubject<boolean> {
    return this.isConnectionLoadingSource$;
  }

  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService,
    private _store: Store<fromRoot.DeviceState>
  ) {
    this.getMacAddress();
  }

  ngOnDestroy() {
    this._serviceActive = false;
  }

  getMacAddress() {
    this._store
      .pipe(
        takeWhile(() => this._serviceActive),
        select(fromRoot.getDeviceNetworkInterfaces)
      )
      .subscribe(networkInterfaces => {
        if (!networkInterfaces) {
          return;
        }
        const networkInterface = networkInterfaces.find(
          (x: NetworkInterface) => x.name === 'eth0'
        );
        this._macAddress = networkInterface.hwaddr;
      });
  }
  //
  /**
   * Get CIK number
   * @memberof SensonodeService
   */
  getCloudCik(): Observable<any> {
    const url = this._localeService.localizeUrl(this._baseUrl + '/cloud/cik');
    return this._DemoAuthService.httpClientGet(url, {
      params: new InterceptorHttpParams({ statusCodesToIgnore: [400] }),
    });
  }

  // /cloud/activation

  activeCloud(): Observable<any> {
    const body = {
      model: 'gateway_app',
      sn: this._macAddress,
      vendor: 'parker',
    };

    const url = this._localeService.localizeUrl(
      this._baseUrl + '/cloud/activation'
    );
    return this._DemoAuthService.httpClientPost(url, body);
  }

  sntoicReresh(): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/cloud/ciktosnmap`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Get list oof serial interfaces from SensoNODE
   *
   * @returns {Observable<SensonodeInterface[]>}
   * @memberof SensonodeService
   */
  listSerialInterfaces(): Observable<SensonodeInterface[]> {
    const url = this._localeService.localizeUrl(this._baseUrl + '/serials');
    /**
     * Development code start.
     *
     * In here we simulate serial interfaces list
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(sensonodeSerialInterfaces).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet<SensonodeInterface[]>(url);
  }

  /**
   * Create SensoNODE interface from serial
   *
   * @param {SerialInterface} serialInterface
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  addSerialInterface(serialInterface: SerialInterface): Observable<any> {
    const url = this._localeService.localizeUrl(this._baseUrl + '/serials');
    /**
     * Development code start.
     *
     * In here we simulate adding of serial interface
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      sensonodeSerialInterfaces.push({
        config: {
          baudRate: 115200,
          serialPort: '/dev/' + serialInterface.name,
        },
        id: 'acab4e8c-fa67-45de-9d99-2d026903667b' + serialInterface.name,
        name: serialInterface.name,
        status: 'ready',
      });
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    const interfaceData = {
      baudRate: parseInt(this._checkSpeed(serialInterface.speed), 10),
      name: serialInterface.name,
      serialPort: '/dev/' + serialInterface.name,
      serialNumber: serialInterface.serialNumber,
      manufacturer: serialInterface.manufacturer,
    };
    return this._DemoAuthService.httpClientPost(url, interfaceData);
  }

  removeSerialInterface(
    sensonodeInterface: SensonodeInterface
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}`
    );
    /**
     * Development code start.
     *
     * In here we simulate removal of serial interface
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      const id = sensonodeSerialInterfaces.findIndex(
        element => element.id === sensonodeInterface.id
      );
      sensonodeSerialInterfaces.splice(id, 1);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Checking connection status
   *
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  serialSensonodeStatus(
    sensonodeInterface: SensonodeInterface
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/status`
    );
    /**
     * Development code start.
     *
     * In here we simulate serial interface status
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of({
        isConnected:
          sensonodeInterface.isConnected ||
          sensonodeInterface.config.serialPort.includes('0'),
      }).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Connect to SensoNODE interface
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  connectSensonode(sensonodeInterface: SensonodeInterface): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/connect`
    );
    /**
     * Development code start.
     *
     * In here we simulate adding of serial interface
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      sensonodeInterface.isConnected = true;
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Disconnect from SensoNODE interface
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  disconnectSensonode(sensonodeInterface: SensonodeInterface): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/disconnect`
    );
    /**
     * Development code start.
     *
     * In here we simulate adding of serial interface
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      sensonodeInterface.isConnected = false;
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Get Parker manufactured interface information
   *
   * @returns {Observable<PRNInfo>}
   * @memberof SensonodeService
   */
  sendCommandV(sensonodeInterface: SensonodeInterface): Observable<PRNInfo> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/commands/v`
    );
    /**
     * Development code start.
     *
     * In here we return fake interface information
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(prnInfo).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet<PRNInfo>(url);
  }

  /**
   * Get list of sensors for the connected interface
   *
   * @returns {Observable<SensorTable[]>}
   * @memberof SensonodeService
   */
  sendCommandLA(
    sensonodeInterface: SensonodeInterface
  ): Observable<SensorTable[]> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/commands/la`
    );
    /**
     * Development code start.
     *
     * In here we return fake sensors information
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(linkTable).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet<SensorTable[]>(url);
  }

  /**
   * Join control off
   *
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  sendCommandJ0(sensonodeInterface: SensonodeInterface): Observable<boolean> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/commands/j0`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Join control on
   *
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  sendCommandJ1(sensonodeInterface: SensonodeInterface): Observable<boolean> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/commands/j1`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Reset join control
   *
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  sendCommandJR(sensonodeInterface: SensonodeInterface): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl + `/serials/${sensonodeInterface.id}/commands/jr`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Send Node Identify command to interface
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @param {SensorTable} sensor
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  sendCommandNID(
    sensonodeInterface: SensonodeInterface,
    sensor: SensorTable
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl +
        `/serials/${sensonodeInterface.id}/commands/nid/${sensor.address}`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Send Node Delete command to interface
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @param {SensorTable} sensor
   * @returns {Observable<boolean>}
   * @memberof SensonodeService
   */
  sendCommandNDE(
    sensonodeInterface: SensonodeInterface,
    sensor: SensorTable
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl +
        `/serials/${sensonodeInterface.id}/commands/nde/${sensor.address}`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(true).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
  }

  /**
   * Send Node request for Firmware version
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @param {SensorTable} sensor
   * @returns {Observable<string>}
   * @memberof SensonodeService
   */
  sendCOmmandNVF(
    sensonodeInterface: SensonodeInterface,
    sensor: SensorTable
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl +
        `/serials/${sensonodeInterface.id}/commands/nfv/${sensor.address}`
    );
    /**
     * Development code start.
     *
     * In here we return fake reaction for command
     */
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log(url);
      return of(`${sensor.linkId},0123,FW,ab,REV`).pipe(delay(1000));
    }
    /**
     * Development code end
     */
    return this._DemoAuthService.httpClientPut(url, null);
    // .map(res => res.text());
  }
  /**
   * Send updated sensor rate
   * @param {SensonodeInterface} sensonodeInterface
   * @param {SensorTable} sensor
   * @param {RateCommand} body
   * @returns {Observable<any>}
   * @memberof SensonodeService
   */
  sendCommandRate(
    sensonodeInterface: SensonodeInterface,
    sensor: SensorTable,
    body: RateCommand
  ): Observable<any> {
    const url = this._localeService.localizeUrl(
      this._baseUrl +
        `/serials/${sensonodeInterface.id}/commands/rate/${sensor.address}`
    );

    return this._DemoAuthService.httpClientPut(url, body);
  }

  sendCommandR3(
    sensonodeInterface: SensonodeInterface,
    sensor: SensorTable,
    body: AccelerationRate
  ): Observable<Object> {
    const url = this._localeService.localizeUrl(
      this._baseUrl +
        `/serials/${sensonodeInterface.id}/commands/r3/${sensor.address}`
    );

    return this._DemoAuthService.httpClientPut(url, body);
  }

  private _checkSpeed(speed: string): string {
    if (!speed || speed === '0') {
      return '115200';
    }
    if (speed.includes(',')) {
      const splitArr = speed.split(',');
      return splitArr[0];
    } else {
      return speed;
    }
  }
}
