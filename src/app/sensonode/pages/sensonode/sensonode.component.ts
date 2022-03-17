import { Subject, Observable, BehaviorSubject, forkJoin, interval } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import {
  takeUntil,
  map,
  finalize,
  skipWhile,
  flatMap,
  mergeMap,
  switchMap,
  takeWhile,
} from 'rxjs/operators';

import { CommonDialogContent, CommonDialogComponent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { SerialInterface } from '@app/system/models';
import {
  PRNInfo,
  JoinStatus,
  PRNConnectionStatus,
  SensonodeInterface,
  SensorTable,
  RateCommand,
} from '@app/sensonode/models';
import { SensonodeService } from '@app/sensonode/services';
import { SensonodeConfirmationDialogComponent } from '@app/shared/components/sensonode-confirmation-dialog';
import { dummyInterfaces } from '@app/sensonode/mock/dummyData';
import { environment } from '@env';
import { Component_Animations } from './sensonode.component.animations';
import { CommandDialogComponent } from '@app/sensonode/components/command-dialog';
import { AccelerationCommandDialogComponent } from '@app/sensonode/components/acceleration-command-dialog';
import * as fromRoot from '@app/state';
import * as deviceActions from '@app/state/device.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'loop-sensonode',
  templateUrl: './sensonode.component.html',
  styleUrls: ['./sensonode.component.scss'],
  animations: Component_Animations,
})
export class SensonodeComponent implements OnInit, OnDestroy {
  serialInterfaces: SerialInterface[] = [];
  serialDataSource: MatTableDataSource<SensonodeInterface>;
  sensorDataSource: MatTableDataSource<SensorTable>;
  prnInfo: PRNInfo;
  isConnectionLoading: BehaviorSubject<boolean>;
  isConnected: boolean;
  joinEnabled = 'Enable';
  joinDisabled = 'Disable';
  joinReset = 'Reset';
  connectionText = 'Loading...';
  cloudButtonText: string;
  cloudActivation: boolean;
  disableCloudButton: boolean;
  joinStatus;
  interfaceConnectionStatuses: Array<PRNConnectionStatus>;

  private _sensorTypeDescriptor = {
    E0: 'Pressure/temperature sensor (99.99..-99.99)',
    E1: 'EAP pressure/temperature sensor',
    E2: 'Pressure/temperature sensor (999.9..-999.9)',
    E3: 'Piezo pressure/temperature sensor',
    E4: 'Pressure/temperature sensor (9999..-9999)',
    E5: 'Thermistor temperature probe sensor',
    E6: 'Dual thermistor temperature probe sensor',
    E7: 'Humidity/temperature sensor',
    E9: 'Single phase current sensor',
    EB: 'Analog flow sensor',
    ED: '4-20mA sensor transmitter',
    EF: 'Digital flow sensor',
    F1: 'Vibration sensor transmitter w/ temperature output',
    F2: 'EAP dual strain sensor transmitter w/ temperature output',
  };

  private _sensonodeInterfaces$ = new BehaviorSubject<SensonodeInterface[]>([]);
  get sensonodeInterfaces() {
    return this._sensonodeInterfaces$.asObservable();
  }

  private _killSubscription$ = new Subject();

  private _selectedInterface$ = new BehaviorSubject<SensonodeInterface>(
    undefined
  );
  private _componentActive = true;
  get selectedInterface(): SensonodeInterface {
    return this._selectedInterface$.getValue();
  }
  set selectedInterface(v: SensonodeInterface) {
    this._selectedInterface$.next(v);
  }

  set snack(text: string) {
    this._notify.notificationSnackSource = { msg: text };
  }

  constructor(
    private _sensoService: SensonodeService,
    private _notify: NotificationsService,
    public dialog: MatDialog,
    private _store: Store<fromRoot.DeviceState>
  ) {}

  ngOnInit() {
    this.isConnectionLoading = this._sensoService.isConnectionLoading$;
    // this.serialDataSource = new SerialIDataSource(this._dm);
    this.serialDataSource = new MatTableDataSource([]);
    this._sensonodeInterfaces$
      .asObservable()
      .subscribe(arr => (this.serialDataSource.data = arr));

    this.sensorDataSource = new MatTableDataSource([]);

    // Subscribe to selected interface changes
    this._selectedInterface$.asObservable().subscribe(selectedInterface => {
      if (selectedInterface) {
        this.getSensorsInfo(selectedInterface);
      }
    });

    // populate networkInterfaces behavior subject
    this._store.dispatch(new deviceActions.LoadDeviceNetworkInterfaces());

    // Start interval polling
    interval(5000)
      .pipe(takeUntil(this._killSubscription$))
      .subscribe(() => {
        this._store.dispatch(new deviceActions.LoadDeviceSerialInterfaces());
        this.checkForSensors();
      });

    this.checkForSerialInterfaces();

    this.sensonodeInterfaces.subscribe(sensonodeInterfaces => {
      sensonodeInterfaces.forEach(sensonodeInterface => {
        sensonodeInterface.isConnected = false;
        sensonodeInterface.isLoading = true;
        this.updateInterfaceStatus(sensonodeInterface);
      });
    });

    this._sensoService.getCloudCik().subscribe(
      res => {
        this.toggleCloudActivation('Activated');
        this.cloudActivation = true;
      },
      () => {
        // If Api returns Error
        this.cloudActivation = false;
        this.toggleCloudActivation('Activate');
      }
    );
  }

  ngOnDestroy() {
    this._killSubscription$.next(true);
    this._componentActive = false;
  }

  get isDevelopment() {
    return !environment.production;
  }

  toggleCloudActivation(status: string): void {
    this.cloudButtonText = status;
    this.disableCloudButton = status === 'Activated' ? true : false;
  }

  refreshSnCik(): void {
    this._sensoService.sntoicReresh().subscribe(() => {});
  }

  activateCloud(): void {
    this._sensoService
      .activeCloud()
      .subscribe(() => this.toggleCloudActivation('Activated'));
  }

  addSerialDevice() {
    const newInterface = {
      manufacturer: 'Parker Hannifin',
      model: '999MHz PRN',
      name: 'ttyACM3',
      serialNumber: '04C2B06F0F001D01',
      speed: '0',
    };
    dummyInterfaces.push(newInterface);
  }

  removeSerialDevice() {
    dummyInterfaces.pop();
  }

  /**
   * Check for newly connected/disconnected sensors
   *
   * @returns {void}
   * @memberof SensonodeComponent
   */
  checkForSensors() {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Sensors Info');
    }
    if (!this.selectedInterface) {
      return;
    }
    this._sensoService
      .sendCommandLA(this.selectedInterface)
      .subscribe(sensorsList => {
        this.sensorDataSource.data = sensorsList;
      });
  }

  /**
   * Add device management info to sensonode interfaces
   * Added name, manufacturer, model and serial number
   *
   * @param {Array<SensonodeInterface>} sensonodeInterfaces
   * @memberof SensonodeComponent
   */
  interfacesDeviceManagementInfo(
    sensonodeInterfaces: Array<SensonodeInterface>
  ) {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Interface Device Management Info');
    }
    sensonodeInterfaces.forEach(sensonodeInterface => {
      const complimentarySerialInterface = this.serialInterfaces.find(
        element =>
          element.name === sensonodeInterface.config.serialPort.substr(5)
      );
      if (complimentarySerialInterface) {
        sensonodeInterface.name = complimentarySerialInterface.name;
        sensonodeInterface.serialNumber =
          complimentarySerialInterface.serialNumber;
        sensonodeInterface.manufacturer =
          complimentarySerialInterface.manufacturer;
        sensonodeInterface.model = complimentarySerialInterface.model;
      }
    });
    if (this.serialInterfaces.length > 0) {
      this._sensonodeInterfaces$.next(sensonodeInterfaces);
    }
  }

  /**
   * Check for newly connected serial interfaces that doesn't exist in our DB
   *
   * @memberof SensonodeComponent
   */
  checkForSerialInterfaces() {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Check for Serial Interfaces');
    }
    // this._dm.serialInterfaces
    this._store
      .pipe(select(fromRoot.getDeviceSerialInterfaces))
      .pipe(
        takeWhile(() => this._componentActive),
        map(serialInterfaces =>
          serialInterfaces.filter(
            res =>
              res.manufacturer &&
              res.manufacturer.toLowerCase().startsWith('parker')
          )
        )
      )
      .subscribe(serialInterfaces => {
        // TODO: For now we just check for length, but deeper analysis needed
        // Also we should add/remove sensonode interfaces
        if (this.serialInterfaces.length !== serialInterfaces.length) {
          this.serialInterfaces = serialInterfaces;
          this._sensoService.listSerialInterfaces().subscribe(interfaces => {
            this.correlateSensonodeInterfaces(interfaces);
          });
        }
      });
  }

  correlateSensonodeInterfaces(interfaces: Array<SensonodeInterface>) {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Correlate Serial Interfaces');
    }
    const observables = [];

    // Check for added devices
    this.serialInterfaces.forEach(serialInterface => {
      const sensonodeInterface = interfaces.find(element =>
        element.config.serialPort.includes(serialInterface.name)
      );
      if (!sensonodeInterface) {
        observables.push(
          this._sensoService.addSerialInterface(serialInterface)
        );
      }
    });

    // Check for removed devices
    interfaces
      .filter(
        sensonodeInterface =>
          !this.serialInterfaces
            .map(element => element.name)
            .includes(sensonodeInterface.name)
      )
      .forEach(element =>
        observables.push(this._sensoService.removeSerialInterface(element))
      );

    if (observables.length > 0) {
      forkJoin(observables).subscribe(() => {
        this._sensoService.listSerialInterfaces().subscribe(result => {
          this.interfacesDeviceManagementInfo(result);
        });
      });
    } else {
      this.interfacesDeviceManagementInfo(interfaces);
    }
  }

  /**
   * Update interface status
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @memberof SensonodeComponent
   */
  updateInterfaceStatus(sensonodeInterface: SensonodeInterface) {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Update Interface Status');
    }
    this._sensoService
      .serialSensonodeStatus(sensonodeInterface)
      .subscribe(interfaceStatus => {
        sensonodeInterface.isConnected = interfaceStatus.isConnected;
        sensonodeInterface.isLoading = false;
        if (
          this.selectedInterface &&
          this.selectedInterface.id === sensonodeInterface.id &&
          !sensonodeInterface.isConnected
        ) {
          this.selectedInterface = undefined;
        }
        if (!this.selectedInterface) {
          this.selectFirstConnected();
        }
      });
  }

  /**
   * Toggle interface connection status
   *
   * @param {SensonodeInterface} sensonodeInterface
   * @memberof SensonodeComponent
   */
  toggleConnection(sensonodeInterface: SensonodeInterface) {
    (!sensonodeInterface.isConnected
      ? this._sensoService.connectSensonode(sensonodeInterface)
      : this._sensoService.disconnectSensonode(sensonodeInterface)
    ).subscribe(result => {
      this.updateInterfaceStatus(sensonodeInterface);
    });
  }

  getSensorsInfo(sensonodeInterface: SensonodeInterface) {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Get Sensors Info');
    }
    this._sensoService
      .sendCommandLA(sensonodeInterface)
      .subscribe(sensorsList => (this.sensorDataSource.data = sensorsList));
    this._sensoService
      .sendCommandV(sensonodeInterface)
      .subscribe(res => (this.prnInfo = res));
  }

  /**
   * Set first connected interface as selected
   *
   * @memberof SensonodeComponent
   */
  selectFirstConnected() {
    if (!environment.production) {
      // tslint:disable-next-line:no-console
      console.log('******* Select First Connected');
    }
    this.selectedInterface = this._sensonodeInterfaces$
      .getValue()
      .find(sensonodeInterface => sensonodeInterface.isConnected === true);
  }

  /**
   * Find if we have at least one connected interface
   *
   * @readonly
   * @type {boolean}
   * @memberof SensonodeComponent
   */
  get isAnyoneConnected(): boolean {
    return !!(
      this._sensonodeInterfaces$.getValue() &&
      this._sensonodeInterfaces$.getValue().find(element => element.isConnected)
    );
  }

  /**
   * Change currently selected interface
   * Block switch interface for certain situations
   *
   * @param {any} event
   * @param {SensonodeInterface} sensonodeInterface
   * @returns {void}
   * @memberof SensonodeComponent
   */
  selectInterface(event, sensonodeInterface: SensonodeInterface) {
    if (
      event.target.tagName === 'BUTTON' ||
      event.target.parentElement.tagName === 'BUTTON' ||
      this.selectedInterface.name === sensonodeInterface.name ||
      !sensonodeInterface.isConnected
    ) {
      return;
    }
    this.selectedInterface = sensonodeInterface;
    this.joinStatus = undefined;
  }

  sensorDescription(sensor: SensorTable): string {
    const type = sensor.address.substr(0, 2);
    return this._sensorTypeDescriptor[type];
  }

  showVibrationCommand(sensor: SensorTable): boolean {
    return sensor.address.substr(0, 2) === 'F1';
  }

  confirm(id: string, text: string): Observable<boolean> {
    return this.dialog
      .open(SensonodeConfirmationDialogComponent, {
        data: {
          id,
          text,
          placeholder: 'link ID',
        },
      })
      .afterClosed()
      .pipe(map(res => (res ? res : false)));
  }

  simpleConfirm(text: string): Observable<boolean> {
    const data: CommonDialogContent = { content: text };
    return this._notify
      .showDialog(data)
      .afterClosed()
      .pipe(map(res => (res ? res : false)));
  }

  spanCalibration(id: string): void {
    const text = 'Are you sure you want to preform a span calibration?';
    this.simpleConfirm(text).subscribe(res => {
      if (res) {
        // tslint:disable-next-line:no-console
        console.log('******* span calibration');
        this.snack = 'Preforming span calibration';
      }
    });
  }

  zeroCalibration(id: string): void {
    const text = 'Are you sure you want to preform a zero calibration.';
    this.simpleConfirm(text).subscribe(res => {
      if (res) {
        // tslint:disable-next-line:no-console
        console.log('******* zero calibration');
        this.snack = 'Preforming zero calibration';
      }
    });
  }

  nodeReset(id: string): void {
    const text =
      'Sensor node ' +
      id +
      ' will erase node link/node number and go to a deep sleep state.';
    this.confirm(id, text).subscribe((res: boolean) => {
      // tslint:disable-next-line:no-console
      console.log(res, 'delete function');
      this.snack = 'Node is reseting';
    });
  }

  nodeSleep(id: string): void {
    const text = 'Sensor node ' + id + 'will go into a deep sleep state.';
    this.confirm(id, text).subscribe((res: boolean) => {
      if (res) {
        // tslint:disable-next-line:no-console
        console.log('******* sleep node');
        this.snack = 'Setting node to sleep';
      }
    });
  }
  /**
   * Get sensor firmware version
   *
   * @param {SensorTable} node
   * @memberof SensonodeComponent
   */
  nodeFirmware(node: SensorTable): void {
    this._sensoService
      .sendCOmmandNVF(this.selectedInterface, node)
      .subscribe(response => {
        node.firmwareVersion = response;
        this.snack = response;
      });
  }

  /**
   * Update sensor rate
   *
   * @param {SensorTable} node
   * @memberof SensonodeComponent
   */
  nodeRate(node: SensorTable): void {
    const dialogRef = this.dialog.open(CommandDialogComponent, {
      width: '35%',
      data: {
        node: node,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        skipWhile(res => res === false || res === undefined),
        flatMap((body: RateCommand) => {
          return this._sensoService.sendCommandRate(
            this.selectedInterface,
            node,
            body
          );
        })
      )
      .subscribe(
        _ =>
          (this._notify.notificationSnackSource = {
            msg: 'Sensor rate changed',
          })
      );
  }
  /**
   * Identify selected sensor
   *
   * @param {SensorTable} node
   * @memberof SensonodeComponent
   */
  nodeIdentify(node: SensorTable): void {
    this._sensoService
      .sendCommandNID(this.selectedInterface, node)
      .subscribe(response => {
        if (response) {
          this.snack = `Node ${node.address} identified`;
        }
      });
  }

  /**
   * Delete selected sensor
   *
   * @param {SensorTable} node
   * @memberof SensonodeComponent
   */
  nodeDelete(node: SensorTable): void {
    const text = 'Are you sure you want to remove this node';
    this.confirm(node.address, text).subscribe(confirmation => {
      if (confirmation) {
        this._sensoService
          .sendCommandNDE(this.selectedInterface, node)
          .subscribe(response => {
            if (response) {
              const sensorList = this.sensorDataSource.data.filter(
                element => element.address === node.address
              );
              this.sensorDataSource.data = sensorList;
              this.snack = `Node ${node.address} was removed`;
            }
          });
      }
    });
  }

  rangeCommand(node: SensorTable): void {
    const dialog = this.dialog
      .open(AccelerationCommandDialogComponent, {
        width: '35%',
        data: {
          node: node,
        },
      })
      .afterClosed()
      .pipe(
        skipWhile(res => res === false || res === undefined),
        mergeMap(body =>
          this._sensoService.sendCommandR3(this.selectedInterface, node, body)
        )
      )
      .subscribe(() => {
        this._notify.notificationSnackSource = { msg: 'Sensor rate changed' };
      });
  }

  /**
   * Send J0/J1/JR commands
   *
   * @param {string} [command]
   * @memberof SensonodeComponent
   */
  setCommand(command?: string): void {
    switch (command) {
      case 'j0':
        this.joinDisabled = 'loading';
        this._sensoService
          .sendCommandJ0(this.selectedInterface)
          .pipe(finalize(() => (this.joinDisabled = 'Disable')))
          .subscribe(() => (this.joinStatus = JoinStatus.Disable));
        break;
      case 'j1':
        this.joinEnabled = 'loading';
        this._sensoService
          .sendCommandJ1(this.selectedInterface)
          .pipe(finalize(() => (this.joinEnabled = 'Enable')))
          .subscribe(() => (this.joinStatus = JoinStatus.Enable));
        break;
      case 'jr':
        this.joinReset = 'loading';
        this.dialog
          .open(CommonDialogComponent, {
            data: {
              title: 'Confirmation',
              content:
                'Are you sure you want to delete all of the sensors from the gateway?  Please type YES to proceed with this action.',
              submit: 'YES',
              cancel: 'CANCEL',
            },
          })
          .afterClosed()
          .pipe(
            skipWhile(res => !res === true),
            switchMap(() =>
              this._sensoService.sendCommandJR(this.selectedInterface)
            )
          )
          .pipe(finalize(() => (this.joinReset = 'Reset')))

          .subscribe(() => (this.joinStatus = JoinStatus.Reset));
        break;
    }
  }

  copyContent(address: string): string {
    return `cosmyna/sensonodegold/${address}`;
  }

  showRawData(row): string {
    if (row.lastKnownData) {
      return row.lastKnownData.rawData;
    }
    return 'Not Available';
  }
}
