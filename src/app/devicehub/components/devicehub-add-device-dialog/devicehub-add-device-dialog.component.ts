import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import {
  map,
  skipWhile,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { forbiddenNameValidator } from '@app/shared/validators';
import {
  cosmynaService,
  cosmynaDynamicInputsService,
} from '@app/cosmyna/services';
import {
  DeviceCommunicationType,
  DeviceType,
  DeviceDriver,
  InputTemplate,
} from '@app/cosmyna/models';
import { LoaderService } from '@app/loop-loader';
import { SerialInterface } from '@app/system/models';
import { Component_Animations } from './cosmyna-add-device-dialog.component.animations';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '@app/state';
import * as deviceActions from '@app/state/device.actions';

@Component({
  selector: 'loop-cosmyna-add-device-dialog',
  templateUrl: './cosmyna-add-device-dialog.component.html',
  styleUrls: ['./cosmyna-add-device-dialog.component.scss'],
  animations: Component_Animations,
})
export class cosmynaAddDeviceDialogComponent implements OnInit, OnDestroy {
  readonly baudrates = [
    1200,
    2400,
    4800,
    9600,
    19200,
    38400,
    576000,
    768000,
    115200,
  ];
  readonly databitsValues = [7, 8];
  readonly stopbitValues = [1, 2];
  // add input name to hide them defaultly
  hideInputsArr: string[] = [
    'privateKey',
    'privateKeyPassword',
    'certificate',
    'password',
    'username',
  ];
  types: Array<DeviceType>;
  drivers: Array<DeviceDriver>;
  addDeviceForm: FormGroup;
  driverInfoForm: FormGroup;
  inputsMeta: (InputTemplate)[];
  showForm = false;
  focus: { [key: string]: boolean } = {};
  visible: { [key: string]: boolean } = {};
  loadingSource: Observable<boolean>;
  serialList: string[] = [];
  filterSerials: Observable<string[]>;
  hideDeviceForm = false;

  private deviceNames: string[];
  private stopSubscriptionStream$: Subject<boolean> = new Subject();
  constructor(
    private _cosmyna: cosmynaService,
    private _fb: FormBuilder,
    private _loader: LoaderService,
    private _mdDialogRef: MatDialogRef<cosmynaAddDeviceDialogComponent>,
    private _cosmynaInput: cosmynaDynamicInputsService,
    private _store: Store<fromRoot.DeviceState>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.deviceNames = data.deviceNames;
  }

  ngOnInit(): void {
    // this._dm.getSerialInterfaces();
    this._store
      .pipe(select(fromRoot.getDeviceSerialInterfaces))
      .pipe(
        takeUntil(this.stopSubscriptionStream$),
        map((res: SerialInterface[]) =>
          res.map(x =>
            x.name.split('/').length > 1 ? x.name : `/dev/${x.name}`
          )
        )
      )
      .subscribe((serialList: string[]) => {
        this.serialList = serialList;
      });
    this._store.dispatch(new deviceActions.LoadDeviceSerialInterfaces());

    this.loadingSource = this._loader.isLoading$;
    this.createAddDForm();
    this._cosmyna
      .getDeviceTypes()
      .pipe(
        takeUntil(this.stopSubscriptionStream$),
        map(res => {
          return res.sort((a, b) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
          );
        })
      )
      .subscribe(types => {
        this.types = types;
        // if edit device
        if (this.data.device) {
          this.populateDeviceTypeDrivers(this.data.device.deviceTypeId);
          this.addDeviceForm.patchValue(this.data.device);
          this.hideDeviceForm = true;
        }
      });

    // watch for changes on type/companies
    this.addDeviceForm.controls['deviceTypeId'].valueChanges
      .pipe(
        skipWhile(res => res === null || res === undefined),
        takeUntil(this.stopSubscriptionStream$),
        switchMap((deviceType: string) => {
          this.populateDeviceTypeDrivers(deviceType);
          // watch for changes on drivers select input
          return this.addDeviceForm.controls['driverId'].valueChanges;
        }),
        tap(res => {
          if (!res) {
            this.showForm = false;
          }
        })
      )
      .subscribe(deviceId => {
        if (deviceId) {
          this.populateForm(deviceId);
        }
      });
  }

  ngOnDestroy(): void {
    this.stopSubscriptionStream$.next(true);
  }

  populateForm(id: string): void {
    this._cosmyna
      .getDriverTemplate(id)
      .pipe(
        takeUntil(this.stopSubscriptionStream$),
        switchMap(res => {
          return this._cosmynaInput
            .createInputs(res)
            .pipe(map(output => output.template));
        })
      )
      .subscribe(inputs => {
        this.inputsMeta = inputs;
        this.createDInfoForm(this.inputsMeta);
        this.sortInputs(
          'name',
          'description',
          'networkAddress',
          'networkPort',
          'security',
          'privateKeyPassword',
          'username'
        );
        if (this.data.device) {
          // populate form if there is data
          this.driverInfoForm.patchValue(this.data.device.properties);
        }
      });
  }
  /**
   * Create Basic Form
   *
   */
  createAddDForm(): void {
    this.addDeviceForm = this._fb.group({
      id: [],
      deviceTypeId: ['', Validators.required],
      driverId: ['', Validators.required],
    });
  }
  /**
   * Used to sort dynamic inputs
   * @param {...string[]} orderBy
   */
  sortInputs(...orderBy: string[]): void {
    let c = 0;
    orderBy.forEach(element => {
      const index = this.inputsMeta.findIndex(x => x.name === element);
      if (index > -1) {
        const temp = this.inputsMeta[index];
        this.inputsMeta[index] = this.inputsMeta[c];
        this.inputsMeta[c] = temp;
        c++;
      }
    });
  }
  /**
   *  Create Dynamic form
   *
   * @param {((InputTemplate| OptionsTemplate) [])} inputs
   */
  createDInfoForm(inputs: (InputTemplate)[]): void {
    const group = {};
    let watchDevice = false;
    let toggleOpcuaInputs = false;
    this.visible = {};
    inputs.forEach(input => {
      // set visibility
      if (this.hideInputsArr.includes(input.name)) {
        this.visible[input.name] = false;
      } else {
        this.visible[input.name] = true;
      }

      group[input.name] = [input.default];
      if (input.required) {
        group[input.name].push(Validators.required);
      }
      if (input.name === 'deviceFile') {
        watchDevice = true;
      }
      if (input.name === 'security') {
        toggleOpcuaInputs = true;
      }
    });
    this.driverInfoForm = this._fb.group(group);
    this.driverInfoForm.controls['name'].setValidators([
      forbiddenNameValidator(this.deviceNames).bind(this),
      Validators.required,
    ]);
    this.showForm = true;
    if (watchDevice) {
      this.filterSerials = this.driverInfoForm.controls[
        'deviceFile'
      ].valueChanges.pipe(
        takeUntil(this.stopSubscriptionStream$),
        startWith(''),
        map(res => {
          return this.serialList.filter((serial: string) => {
            const string = serial as string;
            return string.toLowerCase().indexOf(res.toLowerCase()) === 0;
          });
        })
      );
    }

    if (toggleOpcuaInputs) {
      this.toggleOpcuaSerInputs();
    }
  }

  get isIP(): boolean {
    if (!this.drivers) {
      return false;
    }
    const driver = this.drivers.find(
      element => element.id === this.addDeviceForm.controls['driverId'].value
    );
    return driver && driver.interfaceType === DeviceCommunicationType.Ethernet;
  }

  onSubmit(): void {
    this.markFormGroupTouched(this.driverInfoForm);
    if (this.driverInfoForm.valid) {
      const output = Object.assign(
        this.addDeviceForm.value,
        { name: this.driverInfoForm.value.name },
        { properties: this.driverInfoForm.value }
      );
      this._mdDialogRef.close(output);
    }
  }

  /**
   * show/hide inputs based on OPCUA security input values
   *
   * @memberof cosmynaAddDeviceDialogComponent
   */
  toggleOpcuaSerInputs() {
    this.driverInfoForm.controls['security'].valueChanges
      .pipe(takeUntil(this.stopSubscriptionStream$))
      .subscribe((value: string) => {
        let hideArr = [];
        switch (value) {
          case '0':
            hideArr = [
              'privateKey',
              'privateKeyPassword',
              'certificate',
              'password',
              'username',
            ];
            break;
          case '1':
            hideArr = ['privateKey', 'privateKeyPassword', 'certificate'];
            break;
          case '2':
            hideArr = ['username', 'password'];
            break;
        }

        for (const key of Object.keys(this.visible)) {
          if (hideArr.includes(key)) {
            this.visible[key] = false;
          } else {
            this.visible[key] = true;
          }
        }
      });
  }
  /**
   * Fetch drivers list for specified device type
   *
   * @param {any} event
   * @memberof cosmynaAddDeviceDialogComponent
   */
  populateDeviceTypeDrivers(deviceTypeId: string): void {
    const device = this.types.find(
      deviceType => deviceType.id === deviceTypeId
    );
    this.drivers = device ? device.drivers : null;
    this.addDeviceForm.controls['driverId'].reset();
  }

  get createNew(): boolean {
    return this.addDeviceForm.controls['id'].value === (undefined || null);
  }
  /**
   * Marks all controls in a form group as touched
   * @param formGroup
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
