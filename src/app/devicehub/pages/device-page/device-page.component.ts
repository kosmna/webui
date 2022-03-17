import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatSnackBar,
  MatDialog,
  MatTabGroup,
  MatTabChangeEvent,
} from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cosmynaService, DevicesStoreService } from '@app/cosmyna/services';
import { Device, DeviceStatus } from '@app/cosmyna/models';
import { DemoAuthService } from '@app/core';

@Component({
  selector: 'loop-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.scss'],
})
export class DevicePageComponent implements OnInit, OnDestroy {
  statusSubscriptions = new Map<string, Subscription>();
  devices: Device[];
  restrictedView: boolean;
  private stopSubscriptionStream$ = new Subject();
  private destroySubs$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _cosmynaService: cosmynaService,
    private _auth: DemoAuthService,
    private _deviceStore: DevicesStoreService
  ) {}

  ngOnInit(): void {
    this.restrictedView = this._auth.canAccess('administrator');
    this._cosmynaService.getDevices();
    this.refreshDevices();
  }

  ngOnDestroy(): void {
    this.stopSubscriptionStream$.next(true);
    this.destroySubs$.next(true);
    this.statusSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  /**
   * Refresh device information
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  refreshDevice(device: Device): void {
    this._cosmynaService.readDevice(device).subscribe(refreshedDevice => {
      this._deviceStore.updateDevice(refreshedDevice);
    });
  }

  /**
   * Refresh devices list
   *
   * @memberof cosmynaPageComponent
   */
  refreshDevices(): void {
    this._cosmynaService.getDevices().subscribe(devicesArr => {
      if (devicesArr.length === 0) {
        return;
      }
      this._deviceStore.addDevices(devicesArr);
      this.refreshDevicesStatus();
    });
  }

  /**
   * Perform device creation
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  createDevice(device: Device): void {
    this._cleanObject(device);
    this._cosmynaService.createDevice(device).subscribe(createdDevice => {
      this._deviceStore.addDevice(createdDevice);

      this.stopSubscriptionStream$.next(true);
      this.refreshDevicesStatus();
    });
  }

  /**
   * Perform device removal
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  deleteDevice(device: Device): void {
    this._cosmynaService.deleteDevice(device).subscribe(() => {
      this._deviceStore.removeDevice(device);
      if (this._deviceStore.devices.length === 0) {
        this.stopSubscriptionStream$.next(true);
      }
    });
  }

  /**
   * Perform device update
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  updateDevice(device: Device): void {
    this._cleanObject(device);
    this._cosmynaService.updateDevice(device).subscribe(() => {
      this._deviceStore.updateDevice(device);
    });
  }

  /**
   * Refresh statuses for all devices
   * on success start pollDevicesStatus cycle
   *
   * @memberof cosmynaPageComponent
   */
  refreshDevicesStatus(): void {
    this._cosmynaService.showDevicesStatus().subscribe(statuses => {
      this.setDevicesStatus(statuses);
      this.pollDevicesStatus();
    });
  }

  /**
   * Poll status for all devices in one call
   *
   * @memberof cosmynaPageComponent
   */
  pollDevicesStatus(): void {
    this._cosmynaService
      .pollDevicesStatus()
      .pipe(takeUntil(this.stopSubscriptionStream$))
      .subscribe(statuses => {
        this.setDevicesStatus(statuses);
        this.pollDevicesStatus();
      });
  }

  /**
   * Set status for devices
   *
   * @param {Array<DeviceStatus>} statuses
   * @memberof cosmynaPageComponent
   */
  setDevicesStatus(statuses: DeviceStatus[]): void {
    this._deviceStore.updateStatus(statuses);
  }

  private _cleanObject(object: any): void {
    for (const propertyName in object) {
      if (object[propertyName] === null || object[propertyName] === undefined) {
        delete object[propertyName];
      }
    }
  }
}
