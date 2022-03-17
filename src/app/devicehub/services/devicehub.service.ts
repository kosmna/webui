import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import {
  Device,
  DeviceDriver,
  DeviceRegister,
  OmaBinding,
  DeviceType,
  DeviceParity,
  DeviceStatus,
  DriverTemplate,
  OptionTemplateValues,
  Register,
  MultiRegisterUpload,
} from '@app/cosmyna/models';
import { map, delay } from 'rxjs/operators';

import { DemoAuthService, ServerVersion, LocaleService } from '@app/core';
import { Browse_Tags } from '@app/cosmyna/mock/api-dummy-data';
/**
 * A service for accessing the cosmyna API
 */
@Injectable()
export class cosmynaService {
  readonly parityOptionValue: OptionTemplateValues[] = [
    { value: '0', name: DeviceParity[DeviceParity.Even] },
    { value: '1', name: DeviceParity[DeviceParity.Odd] },
  ];

  private registersTableSource$: Subject<Register[]> = new BehaviorSubject<
    Register[]
  >([]);
  get registersTable$(): Observable<Register[]> {
    return this.registersTableSource$.asObservable();
  }

  private readonly _baseUrl = '/cosmyna';
  private readonly _deviceUrl = this._baseUrl + '/devices';
  private readonly _driverUrl = this._baseUrl + '/drivers';
  private readonly _deviceTypesUrl = this._baseUrl + '/devicetypes';

  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) {}

  /**
   * Get device drivers
   *
   * @returns {Observable<DeviceDriver[]>} - An observable of device drivers array
   * @memberof cosmynaService
   */
  getDrivers(): Observable<DeviceDriver[]> {
    const url = this._localeService.localizeUrl(this._driverUrl);
    return this._DemoAuthService.httpClientGet<DeviceDriver[]>(url);
  }

  /**
   * Get driver by id
   *
   * @param {string} id - Driver id
   * @returns {Observable<DeviceDriver>} - An observable of device driver
   * @memberof cosmynaService
   */
  getDriver(id: string): Observable<DeviceDriver> {
    const url = this._localeService.localizeUrl(`${this._driverUrl}/${id}`);
    return this._DemoAuthService.httpClientGet<DeviceDriver>(url);
  }

  /**
   * Get device driver template
   *
   * @param {string} id - Device id
   * @returns {Observable<DriverTemplate>} - An observable of device driver template
   * @memberof cosmynaService
   */
  getDriverTemplate(id: string): Observable<DriverTemplate> {
    const url = this._localeService.localizeUrl(
      `${this._driverUrl}/${id}/deviceTemplate`
    );
    return this._DemoAuthService.httpClientGet<DriverTemplate>(url).pipe(
      map(driverTemplate => {
        if (driverTemplate.registerMeta) {
          const template = {
            ...driverTemplate.template,
            registerMeta: driverTemplate.registerMeta,
          };
          driverTemplate = { ...driverTemplate, template: template };
        }
        return driverTemplate;
      })
    );
  }

  /**
   * Fetch list of devices
   *
   * @returns {Observable<Device[]>} - An observable of devices array
   * @memberof cosmynaService
   */
  getDevices(): Observable<Device[]> {
    const url = this._localeService.localizeUrl(this._deviceUrl);
    return this._DemoAuthService.httpClientGet<Device[]>(url);
  }

  /**
   * Create new device
   *
   * @param {Device} device - Device data
   * @returns {Observable<Device>} - An observable of created device
   * @memberof cosmynaService
   */
  createDevice(device: Device): Observable<Device> {
    const url = this._localeService.localizeUrl(this._deviceUrl);
    return this._DemoAuthService.httpClientPost<Device>(
      this._deviceUrl,
      device
    );
  }

  /**
   * Get device data
   *
   * @param {Device} device - Device data
   * @returns {Observable<Device>} - An observable of device data
   * @memberof cosmynaService
   */
  readDevice(device: Device): Observable<Device> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${device.id}`
    );
    return this._DemoAuthService.httpClientGet<Device>(url);
  }

  /**
   * Update device
   *
   * @param {Device} device - Device data
   * @returns {Observable<any>} - An observable of update result
   * @memberof cosmynaService
   */
  updateDevice(device: Device): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${device.id}`
    );
    return this._DemoAuthService.httpClientPut<Device>(url, device);
  }

  /**
   * Delete device
   *
   * @param {Device} device - Device object
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  deleteDevice(device: Device): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${device.id}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Get device types array
   *
   * @returns {Observable<DeviceType[]>} - An observable that emits device types
   * @memberof cosmynaService
   */
  getDeviceTypes(): Observable<DeviceType[]> {
    const url = this._localeService.localizeUrl(this._deviceTypesUrl);
    return this._DemoAuthService.httpClientGet<DeviceType[]>(url);
  }

  /**
   * Get device type
   *
   * @param {string} deviceTypeId - ID of device type
   * @returns {Observable<DeviceType>} - An observable of device type
   * @memberof cosmynaService
   */
  getDeviceType(deviceTypeId: string): Observable<DeviceType> {
    const url = this._localeService.localizeUrl(
      `${this._deviceTypesUrl}/${deviceTypeId}`
    );
    return this._DemoAuthService.httpClientGet<DeviceType>(url);
  }

  /**
   * Get device status
   *
   * @param {Device} device - Device object
   * @returns {Observable<DeviceStatus>} - An observable that emits device status immediately
   * @memberof cosmynaService
   */
  getDeviceStatus(device: Device): Observable<DeviceStatus> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${device.id}/showStatus`
    );
    return this._DemoAuthService.httpClientGet<DeviceStatus>(url);
  }

  /**
   * Poll device status
   *
   * @param {Device} device - Device object
   * @returns {Observable<DeviceStatus>} - An observable that emits device status for particular device using poll interval
   * @memberof cosmynaService
   */
  pollDeviceStatus(device: Device): Observable<DeviceStatus> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${device.id}/pollStatus`
    );
    return this._DemoAuthService.httpClientGet<DeviceStatus>(url);
  }

  /**
   * Get status for all devices
   *
   * @returns {Observable<DeviceStatus[]>} - An observable that emits device status array
   * @memberof cosmynaService
   */
  showDevicesStatus(): Observable<DeviceStatus[]> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/showStatusAll`
    );
    return this._DemoAuthService.httpClientGet<DeviceStatus[]>(url);
  }

  /**
   * Poll status for all devices
   *
   * @returns {Observable<DeviceStatus[]>} - An observable that emits device status array using poll interval
   * @memberof cosmynaService
   */
  pollDevicesStatus(): Observable<DeviceStatus[]> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/pollStatusAll`
    );
    return this._DemoAuthService.httpClientGet<DeviceStatus[]>(url);
  }

  /**
   * Get devices for specified driver
   *
   * @param {string} driverId - ID of driver
   * @returns {Observable<Device[]>} - An observable emitting devices
   * @memberof cosmynaService
   */
  getDevicesForDriver(driverId: string): Observable<Device[]> {
    const url = this._localeService.localizeUrl(
      `${this.buildDriverUrl(driverId)}/devices`
    );
    return this._DemoAuthService.httpClientGet<Device[]>(url);
  }

  /**
   * Get device info
   *
   * @param {string} driverID - ID of a driver
   * @param {string} deviceID - ID of a device
   * @returns {Observable<Device>} - An observable emitting device info
   * @memberof cosmynaService
   */
  getDevice(driverID: string, deviceID: string): Observable<Device> {
    const url = this._localeService.localizeUrl(
      this.buildDeviceUrl(driverID, deviceID)
    );
    return this._DemoAuthService.httpClientGet<Device>(url);
  }

  browseTags(deviceID: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${deviceID}/browse`
    );
    return this._DemoAuthService.httpClientGet(url);
  }
  /**
   * Get list of registers
   *
   * @returns {Observable<DeviceRegister[]>} - An observable that emits device registers
   * @memberof cosmynaService
   */
  getRegisters(): Observable<DeviceRegister[]> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/registers`);
    return this._DemoAuthService.httpClientGet<DeviceRegister[]>(url);
  }

  /**
   * Creates a register
   *
   * @param {DeviceRegister} register - Device register object
   * @returns {Observable<DeviceRegister>} - An observable that emits created device register object
   * @memberof cosmynaService
   */
  createRegister(register: DeviceRegister): Observable<DeviceRegister> {
    register.pollingInterval = this.convertPollMili(register.pollingInterval);
    const url = this._localeService.localizeUrl(`${this._baseUrl}/registers`);
    return this._DemoAuthService.httpClientPost<DeviceRegister>(
      url,
      register
    );
  }

  createMultiRegisters(
    registers: MultiRegisterUpload
  ): Observable<MultiRegisterUpload> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/multi`
    );
    return this._DemoAuthService.httpClientPost(url, registers);
  }

  /**
   * Updates a register
   *
   * @param {DeviceRegister} register - Device register object
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  updateRegister(register: DeviceRegister): Observable<any> {
    register.pollingInterval = this.convertPollMili(register.pollingInterval);
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/${register.id}`
    );
    return this._DemoAuthService.httpClientPut<DeviceRegister>(
      url,
      register
    );
  }

  /**
   * Delete a register
   *
   * @param {DeviceRegister} register - Device register object
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  deleteRegister(register: DeviceRegister): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/${register.id}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Read register value
   *
   * @param {DeviceRegister} register - Device register object
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  readRegisterValue(register: DeviceRegister): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/${register.id}/data`
    );
    return this._DemoAuthService.httpClientGet(url);
  }

  /**
   * Write register value
   *
   * @param {DeviceRegister} register - Device register object
   * @param {any} value - Value to set
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  writeRegisterValue(register: DeviceRegister, value): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/${register.id}/data`
    );
    return this._DemoAuthService.httpClientPut(url, value);
  }

  /**
   * Upload registers from CSV file
   *
   * @param {*} data - File data
   * @returns {Obserbable<any>}
   * @memberof cosmynaService
   */
  uploadRegisters(data: any): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/registers/csv`
    );
    return this._DemoAuthService.httpClientPost(url, data);
  }

  /**
   * Download CSV
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  downloadRegisters(): Observable<string> {
    // const url = this._localeService.localizeUrl(`${this._baseUrl}/registers/csv`);
    const url = `${this._baseUrl}/registers/csv`;
    return this._DemoAuthService.httpClientGet<string>(url, {
      responseType: 'text/csv',
    });
  }

  collectRegisters(deviceID: string): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${deviceID}/collectRegistersStatus`
    );
    return this._DemoAuthService.httpClientPost(url, null);
  }

  retrieveRegisters(deviceID: string, regIDs: string[]): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._deviceUrl}/${deviceID}/retriveRegistersStatuses`
    );
    return this._DemoAuthService.httpClientPost(url, regIDs);
  }

  /**
   * Get list of OMA bindings
   *
   * @returns {Observable<OmaBinding[]>} - An observable that emits OMA bindings
   * @memberof cosmynaService
   */
  getOmaBindings(): Observable<OmaBinding[]> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/oma`);
    return this._DemoAuthService.httpClientGet<OmaBinding[]>(url);
  }

  /**
   * Create a new OMA binding
   *
   * @param {OmaBinding} binding - OMA binding object
   * @returns {Observable<DeviceRegister>} - An observable that emits device register with OMA binding
   * @memberof cosmynaService
   */
  createBinding(binding: OmaBinding): Observable<DeviceRegister> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/oma`);
    return this._DemoAuthService
      .httpClientPost<any>(url, binding)
      .pipe(map(result => <DeviceRegister>result));
  }

  /**
   * Update OMA binding
   *
   * @param {OmaBinding} binding - OMA binding object
   * @returns {Observable<any>}
   * @memberof cosmynaService
   */
  updateBinding(binding: OmaBinding): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/oma/${binding.id}`
    );
    return this._DemoAuthService.httpClientPut<OmaBinding>(url, binding);
  }

  /**
   * Delete OMA binding
   *
   * @param {OmaBinding} binding - OMA binding object
   * @returns {Obserbable<any>}
   * @memberof cosmynaService
   */
  deleteBinding(binding: OmaBinding): Observable<any> {
    const url = this._localeService.localizeUrl(
      `${this._baseUrl}/oma/${binding.id}`
    );
    return this._DemoAuthService.httpClientDelete(url);
  }

  /**
   * Get single OMA binding
   *
   * @param {string} driverID - Driver identifier
   * @param {string} deviceID - Device identifier
   * @param {string} registerID - Register identifier
   * @returns {Observable<OmaBinding>} - An observable that emits OMA binding
   * @memberof cosmynaService
   */
  getOmaBinding(
    driverID: string,
    deviceID: string,
    registerID: string
  ): Observable<OmaBinding> {
    const url = this._localeService.localizeUrl(
      this.buildRegisterUrl(driverID, deviceID, registerID)
    );
    return this._DemoAuthService.httpClientGet<OmaBinding>(url);
  }

  /**
   * Get API version
   *
   * @returns {Observable<ServerVersion>}
   * @memberof cosmynaService
   */
  getServerVersion(): Observable<ServerVersion> {
    const url = this._localeService.localizeUrl(`${this._baseUrl}/version`);
    return this._DemoAuthService.httpClientGet<ServerVersion>(url);
  }

  private convertPollMili(num: number | ''): number | '' {
    return num !== '' ? num * 1000 : num;
  }

  private buildDriverUrl(driverID: string): string {
    return this._driverUrl + '/' + driverID;
  }

  private buildDeviceUrl(driverID: string, deviceID: string): string {
    return this.buildDriverUrl(driverID) + '/device/' + deviceID;
  }

  private buildRegisterUrl(
    driverID: string,
    deviceID: string,
    registerID: string
  ): string {
    return this.buildDeviceUrl(driverID, deviceID) + '/registers/' + registerID;
  }
}
