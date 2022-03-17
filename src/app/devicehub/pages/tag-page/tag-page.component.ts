import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { takeUntil, switchMap, startWith } from 'rxjs/operators';
import { zip } from 'rxjs/observable/zip';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import {
  cosmynaService,
  RegistersStoreService,
  DevicesStoreService,
} from '@app/cosmyna/services';
import {
  Device,
  DeviceRegister,
  OmaBinding,
  CSVError,
  MultiRegisterUpload,
} from '@app/cosmyna/models';
import { DemoAuthService, UtilityService } from 'app/core';
import {
  UploadComponent,
  RegisterValueComponent,
} from '@app/cosmyna/components';
import { NotificationsService } from 'app/loop-notifications';
import { interval } from 'rxjs/observable/interval';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.scss'],
})
export class TagPageComponent implements OnInit, OnDestroy {
  restrictedView: boolean;
  devices: Device[];
  // Map for interval subscriptions
  sub = new Map();
  _currentRegisters;
  private stopSubscriptionStream$ = new Subject();
  // Interval for status
  private interval = 10000;

  private _showStatus = false;

  constructor(
    private _cosmynaService: cosmynaService,
    private _mdDialog: MatDialog,
    private _auth: DemoAuthService,
    private _regStore: RegistersStoreService,
    private _deviceStore: DevicesStoreService,
    private _notify: NotificationsService,
    private _utility: UtilityService,
    private _datePipe: DatePipe,
    private _i18n: I18n
  ) {}
  /**
   * Registers current Registers output method
   */
  setcurrentRegisters(regArr: DeviceRegister[]) {
    this._currentRegisters = regArr;
    if (this._currentRegisters.length > 0) {
      // End All intervals on any change
      this.endIntervals();
      if (!this._showStatus) {
        return;
      }
      this.devices.forEach(device => {
        this.getTagStatus(device.id);
      });
    }
  }
  /**
   * Ends Subscriptions for Intervals
   *
   * @memberof TagPageComponent
   */
  endIntervals(): void {
    this.sub.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.restrictedView = this._auth.canAccess('administrator');

    this.getDevices();
    this.refreshRegisters();
  }

  ngOnDestroy(): void {
    this.stopSubscriptionStream$.next(true);
    this.endIntervals();
  }

  getTagStatus(deviceID: string): void {
    // End sub if it already exists
    if (this.sub.has(deviceID)) {
      this.sub.get(deviceID).unsubscribe();
    }
    // Grab current registers based on device ID
    const regIdArr = this._currentRegisters
      .filter(x => x.deviceId === deviceID)
      .map(b => b.id);
    if (regIdArr.length > 0) {
      const sub = interval(this.interval)
        .pipe(
          takeUntil(this.stopSubscriptionStream$),
          startWith(-1),
          switchMap(() => {
            return this._cosmynaService.collectRegisters(deviceID).pipe(
              takeUntil(this.stopSubscriptionStream$),
              switchMap(() =>
                this._cosmynaService.retrieveRegisters(deviceID, regIdArr)
              )
            );
          })
        )
        .subscribe(statuses => {
          this._regStore.addStatus(statuses);
        });
      // Add sub
      this.sub.set(deviceID, sub);
    }
  }

  getDevices(): void {
    this._cosmynaService
      .getDevices()
      .pipe(takeUntil(this.stopSubscriptionStream$))
      .subscribe(devices => {
        this.devices = devices;
        this._deviceStore.addDevices(devices);
      });
  }
  /**
   * Upload multiple tags, for browse tags
   *
   * @param {MultiRegisterUpload} registers
   * @memberof TagPageComponent
   */
  createMultiRegisters(registers: MultiRegisterUpload) {
    this._cosmynaService.createMultiRegisters(registers).subscribe(_ => {
      this.refreshRegisters();
    });
  }
  /**
   * Refresh registers list
   *
   * @memberof cosmynaPageComponent
   */
  refreshRegisters(): void {
    this._cosmynaService
      .getRegisters()
      .pipe(takeUntil(this.stopSubscriptionStream$))
      .subscribe(registers => {
        this._regStore.addRegisters(registers);
      });
  }

  /**
   * Create register
   *
   * @param {DeviceRegister} register
   * @memberof cosmynaPageComponent
   */
  createRegister(register: DeviceRegister): void {
    this._cleanObject(register);
    this._cosmynaService
      .createRegister(register)
      .subscribe((newReg: DeviceRegister) => {
        this._regStore.addRegister(newReg);
      });
  }

  /**
   * Update register
   *
   * @param {DeviceRegister} register
   * @memberof cosmynaPageComponent
   */
  updateRegister(register: DeviceRegister): void {
    this._cleanObject(register);
    this._cosmynaService.updateRegister(register).subscribe(() => {
      this._regStore.updateRegister(register);
    });
  }

  /**
   * Delete register event handler
   *
   * @param {DeviceRegister} register
   * @memberof cosmynaPageComponent
   */
  deleteRegister(register: DeviceRegister): void {
    this._cosmynaService.deleteRegister(register).subscribe(() => {
      this._regStore.deleteRegister(register);
    });
  }
  /**
   * Delete Multiple registers
   *
   * @param {DeviceRegister[]} registersArr
   * @memberof TagPageComponent
   */
  deleteMultiRegisters(registersArr: DeviceRegister[]): void {
    this._utility.disableNav = true;
    const dialogRef = this._notify.showDialog(
      { isLoading: true, title: 'Deleting tags' },
      { disableClose: true }
    );

    const obsArr = [];
    registersArr.forEach((reg, index) => {
      obsArr.push(this._cosmynaService.deleteRegister(reg));
    });

    zip(...obsArr)
      .pipe(
        finalize(() => {
          this._utility.disableNav = false;
          dialogRef.close();
        })
      )

      .subscribe(() => {
        this._regStore.deleteRegisters(registersArr);
      });
  }

  /**
   * Read register value
   *
   * @param {DeviceRegister} register
   * @memberof cosmynaPageComponent
   */
  readRegister(register: DeviceRegister): void {
    this._cosmynaService
      .readRegisterValue(register)
      .subscribe(result => this.showRegisterValueDialog(register, result));
  }

  /**
   * Show edit register value dialog
   *
   * @param {DeviceRegister} register
   * @param {any} value
   * @memberof cosmynaPageComponent
   */
  showRegisterValueDialog(register: DeviceRegister, value: any): void {
    this._mdDialog
      .open(RegisterValueComponent, { width: '50%', data: value })
      .afterClosed()
      .subscribe(result =>
        this.writeRegister(
          register,
          Object.assign(result, { valueType: value.valueType })
        )
      );
  }

  /**
   * Write register value
   *
   * @param {DeviceRegister} register
   * @param {any} payload
   * @memberof cosmynaPageComponent
   */
  writeRegister(register: DeviceRegister, payload: any): void {
    this._cosmynaService.writeRegisterValue(register, payload).subscribe(
      () =>
        (this._notify.notificationSnackSource = {
          msg: this._i18n('Register value successfully updated'),
          action: this._i18n('Dismiss'),
        })
    );
  }

  /**
   * Upload registers CSV
   *
   * @param {any} file
   * @memberof cosmynaPageComponent
   */
  uploadRegisters(file: any): void {
    this._cosmynaService
      .uploadRegisters(file)
      .subscribe((csvErrors: CSVError[]) => {
        this.refreshRegisters();
        // handle csv errors
        if (csvErrors.length > 0) {
          this._mdDialog
            .open(UploadComponent, { width: '70%', data: csvErrors })
            .afterClosed()
            .subscribe(_ => {});
        }
      });
  }

  /**
   * string to csv using Blob
   *
   * @memberof TagPageComponent
   */
  downloadRegisters(): void {
    this._cosmynaService.downloadRegisters().subscribe((csv: string) => {
      const date: string = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
      const filename = `tag-${date}.csv`;

      const blob: Blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', filename);
          // link.style = 'visibility:hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  }

  /**
   * Create OMA binding and emit new value
   *
   * @param {OmaBinding} binding
   * @memberof cosmynaPageComponent
   */
  createBinding(binding: OmaBinding): void {
    this._cleanObject(binding);
    this._cosmynaService.createBinding(binding).subscribe(register => {
      const { oma } = register;
      this._regStore.setRegisterOma(oma);
    });
  }

  /**
   * Update binding
   *
   * @param {OmaBinding} binding
   * @memberof cosmynaPageComponent
   */
  updateBinding(binding: OmaBinding): void {
    this._cleanObject(binding);
    this._cosmynaService.updateBinding(binding).subscribe(() => {
      this._regStore.setRegisterOma(binding);
    });
  }

  /**
   * Delete OMA binding event handler
   *
   * @param {OmaBinding} binding
   * @memberof cosmynaPageComponent
   */
  deleteBinding(binding: OmaBinding): void {
    this._cosmynaService.deleteBinding(binding).subscribe(() => {
      this._regStore.deleteRegisterOma(binding);
    });
  }

  toggleStatus(showStatus: boolean) {
    this._showStatus = showStatus;
    if (showStatus) {
      this.devices.forEach(device => {
        this.getTagStatus(device.id);
      });
    } else {
      this.endIntervals();
    }
  }
  private _cleanObject(object: any): void {
    for (const propertyName in object) {
      if (object[propertyName] === null || object[propertyName] === undefined) {
        delete object[propertyName];
      }
    }
  }
}
