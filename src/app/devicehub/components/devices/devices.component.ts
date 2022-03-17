import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, Observable, of } from 'rxjs';

import {
  LoopAddCardComponent,
  SensonodeConfirmationDialogComponent,
} from '@app/shared';
import {
  Device,
  DeviceCommunicationType,
  DeviceParity,
} from '@app/cosmyna/models';
import { cosmynaAddDeviceDialogComponent } from '../cosmyna-add-device-dialog';
import { LoaderService } from '@app/loop-loader';
import { DevicesStoreService } from '@app/cosmyna/services';
import { Component_Animations } from './devices.component.animations';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  animations: Component_Animations,
})
export class DevicesComponent implements OnInit, OnDestroy {
  animation: string;
  pageNumber = 0;
  itemsPerPage = 6;
  firstLoad = true;
  // unsubscribe
  // disable card buttons when loading
  disabledLoading: Observable<boolean>;
  devices: Device[] = [];

  @Input() allowedRole: boolean;
  @Output() createDevice = new EventEmitter<Device>();
  @Output() refreshDevice = new EventEmitter<Device>();
  @Output() updateDevice = new EventEmitter<Device>();
  @Output() deleteDevice = new EventEmitter<Device>();
  @ViewChild('addCard') addCard: LoopAddCardComponent;

  protected destroyed$: Subject<boolean> = new Subject();

  get deviceLength(): number {
    return this.devices ? this.devices.length : 0;
  }

  constructor(
    public dialog: MatDialog,
    private _loaderService: LoaderService,
    private _deviceStore: DevicesStoreService,
    private _i18n: I18n
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onScreenResize(event) {
    const width = event.target.innerWidth;
    this.setItemsPerPage(width);
  }
  setItemsPerPage(width = window.innerWidth): void {
    if (width < 960) {
      this.itemsPerPage = 100;
      this.pageNumber = 0;
    } else if (width < 1289) {
      this.itemsPerPage = 3;
    } else if (width < 1650) {
      this.itemsPerPage = 5;
    } else if (width < 2010) {
      this.itemsPerPage = 7;
    } else {
      this.itemsPerPage = 9;
    }
  }
  ngOnInit(): void {
    this._deviceStore.devices$.subscribe(devicesArr => {
      this.devices = devicesArr;

      this.setItemsPerPage();
      this.setAnimation();
    });
    // this.animation = 'created';
    // For disabling card buttons when loading
    this.disabledLoading = this._loaderService.isLoading$;
  }
  /**
   * Return device names for a input validator in  Dialog
   *
   * @readonly
   * @type {string[]}
   * @memberof DevicesComponent
   */
  get devicesNamesArr(): string[] {
    const devices = this.devices.map(device => device.name);
    return devices;
  }

  setAnimation(): void {
    this.animation = this.firstLoad ? 'created' : '';
    this.firstLoad = false;
  }

  setPage(page: number): void {
    this.pageNumber = page;
  }

  refreshDevices(event): void {
    this.animation = 'refresh';
    this.refreshDevice.emit(event);
  }

  getType(device: Device): string {
    return DeviceCommunicationType[device.driver.interfaceType];
  }

  getParity(device: Device): string {
    return DeviceParity[device['properties'].parity];
  }

  /**
   * Present add device dialog
   *
   * @memberof DevicesComponent
   */
  showAddDeviceDialog(): void {
    const deviceNames = this.devicesNamesArr;
    this.disabledLoading = of(null);
    this.dialog
      .open(cosmynaAddDeviceDialogComponent, {
        width: '60%',
        data: { deviceNames },
      })
      .afterClosed()
      .subscribe(device => {
        this.disabledLoading = this._loaderService.isLoading$;
        if (device) {
          this.createDevice.emit(device);
          this.animation = 'created';
        }
      });
  }

  /**
   * Present remove device dialog
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  showRemoveDeviceDialog(device: Device): void {
    const data = {
      id: device.name,
      text: this._i18n('Warning deleting this device is irreversible. '),
      placeholder: this._i18n('Device Name'),
    };

    this.dialog
      .open(SensonodeConfirmationDialogComponent, { disableClose: true, data })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteDevice.emit(device);
          this.animation = 'destroyed';
        }
      });
  }

  /**
   * Show edit device dialog
   *
   * @param {Device} device
   * @memberof DevicesComponent
   */
  showEditDeviceDialog(device: Device) {
    const deviceNames = this.devicesNamesArr.filter(x => x !== device.name);
    this.disabledLoading = of(null);
    this.dialog
      .open(cosmynaAddDeviceDialogComponent, {
        width: '60%',
        data: { device, deviceNames },
      })
      .afterClosed()
      .subscribe(newDevice => {
        this.disabledLoading = this._loaderService.isLoading$;
        if (newDevice) {
          this.updateDevice.emit(newDevice);
        }
      });
  }
}
