import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
} from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatSelect,
  MatDialog,
  MatMenuTrigger,
} from '@angular/material';
import { BehaviorSubject, Subscription } from 'rxjs';
// import { trigger, state, style, transition, group, animate, keyframes, } from '@angular/animations';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { skipWhile, map, distinctUntilChanged } from 'rxjs/operators';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

import { RegistersWriteDialogComponent } from '../registers-write-dialog';
import {
  Device,
  DeviceRegister,
  OmaBinding,
  MultiRegisterUpload,
} from '@app/cosmyna/models';
import { RegistersDataSource } from './registers.datasource';
import { RegistersAddRegisterDialogComponent } from '../registers-add-register-dialog';
import { CommonDialogComponent } from '@app/shared';
import { OmaDialogComponent } from '../oma-dialog';
import { UploadComponent } from '../upload';
import { UtilityService } from '@app/core';
import { RegistersStoreService } from '@app/cosmyna/services';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { BrowseTagDialogComponent } from '../browse-tag-dialog/browse-tag-dialog.component';
import { CSV_Template } from './csv-template';
import { environment } from '@env';

@Component({
  selector: 'loop-registers',
  templateUrl: './registers.component.html',
  styleUrls: ['./registers.component.scss'],
})
export class RegistersComponent
  implements OnInit, OnChanges, AfterViewInit, AfterContentInit, OnDestroy {
  @Input()
  devices: Array<Device>;
  @Input()
  allowedRole: boolean;

  @Output()
  createRegister = new EventEmitter<DeviceRegister>();
  @Output()
  writeRegister = new EventEmitter<DeviceRegister>();
  @Output()
  updateRegister = new EventEmitter<DeviceRegister>();
  @Output()
  deleteRegister = new EventEmitter<DeviceRegister>();
  @Output()
  deleteMultiRegisters = new EventEmitter<DeviceRegister[]>();
  @Output()
  uploadRegisters = new EventEmitter<any>();
  @Output()
  downloadRegisters = new EventEmitter<any>();
  @Output()
  createBinding = new EventEmitter<OmaBinding>();
  @Output()
  updateBinding = new EventEmitter<OmaBinding>();
  @Output()
  deleteBinding = new EventEmitter<OmaBinding>();
  @Output()
  createMultiRegisters = new EventEmitter<MultiRegisterUpload>();
  @Output()
  currentRegisters = new EventEmitter<DeviceRegister[]>();
  @Output()
  toggleStatus = new EventEmitter<boolean>();

  mediaSub: Subscription;
  filterFormSub: Subscription;
  typeFormSub: Subscription;
  deviceFormSub: Subscription;
  // Flex media screen
  dataSource: RegistersDataSource;
  readonly medColumns = [
    'status',
    'tagName',
    'pollingInterval',
    'address',
    'valueType',
    'deviceId',
    'dbNumber',
    'omaBinding',
    'ipsoTopic',
    'rawTopic',
  ];

  readonly smColumns = [
    'status',
    'tagName',
    'pollingInterval',
    'address',
    'valueType',
    'dbNumber',
    'deviceId',
    'omaBinding',
  ];

  readonly lgColumns = [
    'status',
    'tagName',
    'pollingInterval',
    'address',
    'valueType',
    'dbNumber',
    'deviceId',
    'omaBinding',
    'ipsoTopic',
    'rawTopic',
    'description',
  ];

  mediaScreen: string;
  modeValues = [0, 1];
  typeValues = ['string', 'integer', 'float', 'bit'];
  pageSizeOptions: number[] = [15, 20, 50, 100];
  deviceNameFilter: string[] = [];
  filterForm: FormGroup;
  form: FormGroup;
  @ViewChild('deviceFilter')
  deviceFilter: MatSelect;
  @ViewChild('typeFilter')
  typeFilter: MatSelect;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatMenuTrigger)
  menuTrigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger)
  addTrigger: MatMenuTrigger;
  selectedPage: number;
  sub: Subscription;
  showDocsBtn: boolean;
  showStatus = false;
  private displaySetting$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    public _mdDialog: MatDialog,
    private _fb: FormBuilder,
    private _utility: UtilityService,
    private _regStore: RegistersStoreService,
    private _observableMedia: ObservableMedia,
    private _i18n: I18n
  ) {
    this.showDocsBtn = this._utility.isLitmus() && this._utility.checkOnline();
  }

  ngOnDestroy(): void {
    // unsubscribe
    this.sub.unsubscribe();
    this.mediaSub.unsubscribe();
    this.filterFormSub.unsubscribe();
    // this.typeFormSub.unsubscribe();
    // this.deviceFormSub.unsubscribe();
    this.dataSource.disconnect();
  }

  ngOnInit(): void {
    this.createCheckboxForm();

    this.filterForm = this._fb.group({
      typeValues: [[]],
      deviceType: [[]],
    });

    /**
     *
     * TODO Current Bug with initial value. Hiding small view options until fixed.
     * Checks screen size and set either check boxes or select options
     */
    this.mediaSub = this._utility.media$
      .pipe(map((change: MediaChange) => change.mqAlias))
      .subscribe((screenSize: string) => {
        // filter menu based on screen size
        this.filterScreenSize(screenSize);

        this.mediaScreen = screenSize;
      });

    // create datasource
    this.dataSource = new RegistersDataSource(this.paginator, this.sort);
  }

  ngOnChanges(changes): void {
    const devices = {};
    const devicesArr = changes.devices.currentValue;
    if (devicesArr && this.form) {
      const deviceForm =
        (this.form.get('deviceType') as FormGroup) || new FormGroup({});
      this.devices.forEach((device: Device) => (devices[device.name] = false));
      this.deviceNameFilter = Object.keys(devices);

      this.deviceNameFilter.forEach((device: string) =>
        deviceForm.addControl(device, new FormControl(false))
      );
    }
  }

  /** For displaying columns */
  get columns(): string[] {
    const column = [];

    switch (this.mediaScreen) {
      case 'xl':
        column.push(...this.lgColumns);
        break;
      case 'sm':
      case 'xs':
        column.push(...this.smColumns);
        break;
      default:
        column.push(...this.medColumns);
    }
    if (this.allowedRole) {
      column.push('actions');
    }

    if (!this.showStatus) {
      column.shift();
    }

    return column;
  }
  trackBy(row) {
    return row.id;
  }

  filterScreenSize(screenSize: string): void {
    if (screenSize === 'xs' || screenSize === 'sm') {
      this.displaySetting$.next('small');

      this.closeSelect(this.deviceFilter);
      this.closeSelect(this.typeFilter);
      this.closeMenu(this.addTrigger);

      this.setCheckboxes();
    } else {
      this.displaySetting$.next('normal');
      this.closeMenu(this.menuTrigger);

      // this.setSelect();
    }
  }

  ngAfterViewInit(): void {
    /** Get Registers  */
    this.sub = this._regStore.registers$.subscribe(res => {
      this.dataSource.data = res;
      this.checkIfPageEmpty(this.selectedPage, res.length);
    });

    this.filterFormSub = this.filterForm.valueChanges.subscribe(changes => {
      // if (this.displaySetting$.value === 'normal') {
      // this.dataSource.typeFilter = changes.typeValues;
      this.dataSource.deviceFilter = this._getDeviceID(changes.deviceType);
      // }
    });

    const typeForm = this.form.get('typeValues') as FormGroup;
    this.typeFormSub = typeForm.valueChanges.subscribe(changes => {
      const filterType: string[] = Object.keys(changes).filter(
        key => changes[key] === true
      );
      if (this.displaySetting$.value === 'small') {
        this.dataSource.typeFilter = filterType;
      }
    });
    // TODO small Filter disabled Delete if cant fix bug
    // const deviceForm = this.form.get('deviceType') as FormGroup;
    // this.deviceFormSub = deviceForm.valueChanges.subscribe(changes => {
    //   const deviceFilterArr: string[] = Object.keys(changes).filter(
    //     (key: string) => changes[key] === true
    //   );
    //   // if (this.displaySetting$.value === 'small') {
    //   //   this.dataSource.deviceFilter = this._getDeviceID(deviceFilterArr);
    //   // }
    // });
    // Temp fix for Media bug on initial value
    this.checkMediaOnLoad();

    /**
     * Emits current visible elements
     */
    this.dataSource
      .connect()
      .pipe(
        /**
         * If the first element is the same and the length
         * We assume that there is no change
         */
        distinctUntilChanged((x, y) => {
          return x[0] === y[0] && x.length === y.length;
        })
      )
      .subscribe(registers => {
        this.currentRegisters.emit(registers);
      });
  }

  /**
   * AfterContentInit lifecycle hook
   *
   * @memberof RegistersComponent
   */
  ngAfterContentInit() {
    this.updateSelectedPage();
  }

  browseTags(): void {
    this._mdDialog
      .open(BrowseTagDialogComponent, {
        minWidth: '320px',
        disableClose: true,
      })
      .afterClosed()
      .pipe(skipWhile(res => res === false))
      .subscribe(registers => {
        this.createMultiRegisters.emit(registers);
      });
  }
  /**
   * Update selected page from paginator.
   *
   * @memberof RegistersComponent
   */
  updateSelectedPage() {
    this.selectedPage = this.paginator.pageIndex + 1;
  }

  /**
   * Update paginator on manual page select
   *
   * @param {number} page           Page number
   * @memberof RegistersComponent
   */
  updatePaginator(page: number) {
    if (page && page - 1 <= this.paginator.getNumberOfPages()) {
      this.paginator.pageIndex = page - 1;
      this.paginator.page.emit();
    }
  }

  /**
   * Check if page are empty and open previous page
   *
   * @param {number} pageNumber         Page number
   * @param {number} length             Data array length
   * @memberof RegistersComponent
   */
  checkIfPageEmpty(pageNumber: number, length: number) {
    const itemsOnPage = length - this.paginator.pageSize * (pageNumber - 1);
    if (pageNumber > 1 && length > 0 && itemsOnPage === 0) {
      this.updatePaginator(pageNumber - 1);
    }
  }

  /**
   * Filter for search input
   *
   * @param {string} filterValue
   */
  applyFilter(filterValue: string) {
    if (filterValue.includes('/')) {
      filterValue = filterValue.replace(/\//g, ''); // removes backslash for OMA bindings
    }
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // dataSource defaults to lowercase matches
    this.dataSource.inputFilter = filterValue;
  }

  createCheckboxForm(): void {
    this.form = new FormGroup({
      deviceType: new FormGroup({}),
      typeValues: new FormGroup({}),
    });

    const typeValuesForm = this.form.get('typeValues') as FormGroup;
    this.typeValues.forEach(type =>
      typeValuesForm.addControl(type, new FormControl(false))
    );
  }

  /**
   * Populates checked menu inputs based of select options
   *
   * @memberof RegistersComponent
   */
  setCheckboxes(): void {
    const deviceForm = this.form.get('deviceType') as FormGroup;
    const devicesArr = this.filterForm.controls['deviceType'].value as string[];

    const typeValueForm = this.form.get('typeValues') as FormGroup;
    const typeValueArr = this.filterForm.controls['typeValues']
      .value as string[];
    if (devicesArr.length > 0) {
      this.devices.forEach(device => {
        const dName = device.name;
        if (devicesArr.includes(dName)) {
          deviceForm.controls[dName].setValue(true);
        } else {
          deviceForm.controls[dName].setValue(false);
        }
      });
    }

    if (typeValueArr.length > 0) {
      this.typeValues.forEach((type: string) => {
        if (typeValueArr.includes(type)) {
          typeValueForm.controls[type].setValue(true);
        } else {
          typeValueForm.controls[type].setValue(false);
        }
      });
    }

    this.filterForm.controls['deviceType'].setValue([]);
    this.filterForm.controls['typeValues'].setValue([]);
  }
  /**
   * Populates normal view select inputs based of small view checked menu inputs
   *
   * @memberof RegistersComponent
   */
  setSelect(): void {
    const deviceFormValue = this.form.controls['deviceType'].value;
    // const typeFormValue = this.form.get('typeValues').value as FormGroup;

    const deviceArr = Object.keys(deviceFormValue).filter(
      x => deviceFormValue[x] === true
    );
    // const typeArr = Object.keys(typeFormValue).filter(
    //   c => typeFormValue[c] === true
    // );
    this.filterForm.controls['deviceType'].setValue(deviceArr);
    // this.filterForm.controls['typeValues'].setValue(typeArr);
  }

  /**
   * Opens add register dialog
   *
   * @memberof RegistersComponent
   */
  showAddRegisterDialog(): void {
    this._mdDialog
      .open(RegistersAddRegisterDialogComponent, {
        width: '70%',
        data: { devices: this.devices },
      })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(register => {
        this.createRegister.emit(register);
      });
  }

  /**
   * Read current and set new register value
   *
   * @param {DeviceRegister} register
   * @memberof RegistersComponent
   */
  setValue(register: DeviceRegister): void {
    const data = {
      width: '45%',
      data: {
        register: register,
        type: 'write',
      },
    };

    this._mdDialog.open(RegistersWriteDialogComponent, data);

    // this.writeRegister.emit(register);
  }

  /**
   * Read current and set new register value
   *
   * @param {DeviceRegister} register
   * @memberof RegistersComponent
   */
  pollRegister(register: DeviceRegister): void {
    const data = {
      width: '45%',
      data: {
        register: register,
        type: 'pollonce',
      },
    };

    this._mdDialog.open(RegistersWriteDialogComponent, data);

    // this.writeRegister.emit(register);
  }

  /**
   * Show edit register dialog
   *
   * @param {DeviceRegister} register
   * @memberof RegistersComponent
   */
  editRegister(register: DeviceRegister): void {
    this._mdDialog
      .open(RegistersAddRegisterDialogComponent, {
        data: { devices: this.devices, register: register },
      })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(updatedRegister => {
        if (updatedRegister) {
          this.updateRegister.emit(updatedRegister);
        }
      });
  }

  /**
   * Show remove register confirmation
   *
   * @param {DeviceRegister} register
   * @memberof RegistersComponent
   */
  removeRegister(register: DeviceRegister): void {
    this._mdDialog
      .open(CommonDialogComponent, {
        data: {
          title: this._i18n('Confirmation'),
          content: this._i18n( { value: 'Are you sure you want to delete this register?', description: 'Removing register/ tag.'}),
        },
      })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(_ => {
        this.deleteRegister.emit(register);
      });
  }
  /**
   * To Delete multiple Registers
   *
   * @param {DeviceRegister[]} regArr
   * @memberof RegistersComponent
   */
  removeMultiRegisters(regArr: DeviceRegister[]): void {
    this._mdDialog
      .open(CommonDialogComponent, {
        data: {
          title: this._i18n('Confirmation'),
          content: this._i18n(
            'Are you sure you want to delete selected registers?'
          ),
        },
      })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(_ => {
        if (regArr.length > 0) {
          this.deleteMultiRegisters.emit(regArr);
        }
      });
  }

  /**
   * Show add binding dialog and emit created binding
   *
   * @param {DeviceRegister} register
   * @memberof RegistersComponent
   */
  addBindingDialog(register: DeviceRegister): void {
    this._mdDialog
      .open(OmaDialogComponent, { width: '70%', data: { register: register } })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(createdBinding => {
        this.createBinding.emit(createdBinding);
      });
  }

  /**
   * Show update binding dialog and emit updated binding
   *
   * @param {OmaBinding} binding
   * @memberof RegistersComponent
   */
  updateBindingDialog(binding: OmaBinding): void {
    this._mdDialog
      .open(OmaDialogComponent, { width: '70%', data: { binding: binding } })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(updatedBinding => {
        this.updateBinding.emit(updatedBinding);
      });
  }

  /**
   * Show delete binding confirmation dialog
   *
   * @param {OmaBinding} binding
   * @memberof RegistersComponent
   */
  deleteBindingDialog(binding: OmaBinding): void {
    this._mdDialog
      .open(CommonDialogComponent, {
        width: '30%',
        data: {
          title: this._i18n('Confirmation'),
          content: this._i18n('Are you sure you want to delete this binding?'),
        },
      })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(_ => {
        this.deleteBinding.emit(binding);
      });
  }

  /**
   * Shows upload registers form
   *
   * @memberof RegistersComponent
   */
  showUploadForm(): void {
    this._mdDialog
      .open(UploadComponent, { width: '30%' })
      .afterClosed()
      .pipe(skipWhile(res => !res === true))
      .subscribe(result => {
        this.uploadRegisters.emit(result);
      });
  }

  /**
   * Opens a new tab to Litmus Automation Docs
   *
   * @memberof RegistersComponent
   */
  goDocumentation(): void {
    window.open(environment.documentationUrl, '_blank');
  }

  /**
   * Download Csv template
   *
   * @memberof RegistersComponent
   */
  downloadSampleCsv(): void {
    const headers: string = CSV_Template;
    let csvContent = 'data:text/csv;charset=utf-8,';

    csvContent = csvContent + headers;
    const encodedUri = encodeURI(csvContent);
    // window.open(encodedUri);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'tag-template.csv');
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }

  private closeMenu(el: MatMenuTrigger): void {
    if (el) {
      if (el.menuOpen) {
        el.closeMenu();
      }
    }
  }

  private closeSelect(el: MatSelect): void {
    if (el) {
      if (el.panelOpen) {
        el.close();
      }
    }
  }

  private _getDeviceID(nameArr: string[]): string[] {
    if (!nameArr || nameArr.length === 0) {
      return [];
    } else {
      return nameArr.map((device: string) => {
        const deviceObj = this.devices.find((x: Device) => x.name === device);
        return deviceObj.id;
      });
    }
  }

  /**
   * Check media size on page load
   *
   * @memberof CloudConnectorsComponent
   */
  private checkMediaOnLoad() {
    if (this._observableMedia.isActive('xs')) {
      this.filterScreenSize('xs');
    } else if (this._observableMedia.isActive('sm')) {
      this.filterScreenSize('sm');
    } else {
      this.filterScreenSize('lg');
    }
  }
}
