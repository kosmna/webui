import { Injectable } from '@angular/core';

import {
  Device,
  DeviceStatus
} from '@app/cosmyna/models';
import { BehaviorSubject } from 'rxjs';
/**
 * Devices Datastore Service
 *
 * @export
 * @class DevicesStoreService
 */
@Injectable()
export class DevicesStoreService {
  private devicesSource$: BehaviorSubject<Device[]> = new BehaviorSubject<Device[]>([]);
  private dataStore: { devices: Device[] } = { devices: []};
  /** Observable for devices list   */
  get devices$() {
    return this.devicesSource$.asObservable();
  }
  /**
   * Returns Devices
   * @readonly
   * @type {Device[]}
   * @memberof DevicesStoreService
   */
  get devices(): Device[] {
    return this.dataStore.devices;
  }

  constructor() { }
  /**
   * Add List devices to datastore
   *
   * @param {Device[]} devicesArr
   * @memberof DevicesStoreService
   */
  addDevices(devicesArr: Device[]): void {
    this.dataStore.devices = devicesArr;
    this.devicesSource$.next(devicesArr);
  }
  /**
   * Add a single device
   *
   * @param {Device} device
   * @memberof DevicesStoreService
   */
  addDevice(device: Device): void {
    const devicesArr = this.devices;
    devicesArr.push(device);
    this.devicesSource$.next(devicesArr);
  }
  /**
   * Remove Device from datastore
   *
   * @param {Device} device
   * @memberof DevicesStoreService
   */
  removeDevice(device: Device): void {
    const devicesArr = this.devices;
    devicesArr.splice(devicesArr.findIndex(element => element.id === device.id), 1);
    this.devicesSource$.next(devicesArr);
  }
  /**
   * Update Device
   *
   * @param {Device} device
   * @memberof DevicesStoreService
   */
  updateDevice(device: Device): void {
    const devicesArr = this.devices;
    const index = devicesArr.findIndex(element => element.id === device.id);
    Object.assign(devicesArr[index], device);
    this.devicesSource$.next(devicesArr);
  }
  /**
   * Update Devices status
   *
   * @param {DeviceStatus[]} statuses
   * @memberof DevicesStoreService
   */
  updateStatus(statuses: DeviceStatus[] ): void {
    const devicesArr = this.devices;
    statuses.forEach(status => {
      const deviceForUpdate = devicesArr.find(device => device.id === status.id);
      if (deviceForUpdate) {
        deviceForUpdate.state = status;
      }
    });
    this.devicesSource$.next(devicesArr);
  }

}
