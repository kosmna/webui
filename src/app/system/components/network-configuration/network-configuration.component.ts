import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';

import { CommonDialogComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService } from '@app/core';
import { NetworkConfig } from '@app/system/models';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { NetworkReconnectionComponent } from '../network-reconnection/network-reconnection.component';
import { CidrValidators } from './cidr-validators';

@Component({
  selector: 'loop-network-configuration',
  templateUrl: './network-configuration.component.html',
  styleUrls: ['./network-configuration.component.scss']
})
export class NetworkConfigurationComponent implements OnInit, OnChanges {

  @Input() networkInterface: NetworkConfig;
  @Output() onSubmit = new EventEmitter<boolean>();
  @Output() interfaceChange  = new EventEmitter<any>();
  interfaceForm: FormGroup;
  showInputs = {
    inet6: false,
    inet: false
  };

  /** Type options */
  ip4Types = [
    {
      value: 'none',
      name: 'None'
    },
    {
      name: 'DHCP',
      value: 'dhcp'
    },
    {
      name: 'Static',
      value: 'static'
    }
  ];
  ip6Types = [
    {
      value: 'none',
      name: 'None'
    },
    {
      value: 'auto',
      name: 'Auto'
    },
    {
      name: 'DHCP',
      value: 'dhcp6'
    },
    {
      name: 'Static',
      value: 'static'
    }
  ];
  hostname: string;
  private _isLoading = true;
  private _currentIp6Address: string;
  private _currentIp4Address: string;
  private _startValue: NetworkConfig;

  constructor(
    private _deviceManagementService: DeviceManagementService,
    private _formBuilder: FormBuilder,
    private _mdSnackBar: MatSnackBar,
    private _mdDialog: MatDialog,
    private _DemoAuthService: DemoAuthService,
    private _i18n: I18n
  ) { }

  /**
   * Initialization
   *
   * @memberof NetworkConfigurationComponent
   */
  ngOnInit(): void {
    this._createForm();

    if (!this.networkInterface) {
      return;
    }

    this._fetchData();
  }

  ngOnChanges(changes): void {

    if (changes.networkInterface && !changes.networkInterface.firstChange) {
      this._fetchData();
    }
  }

  /**
   * Check if IP address was changed
   *
   * @memberof NetworkConfigurationComponent
   */
  checkSubmit(): void {
    if (this.addressChanged) {
      this._mdDialog.open(CommonDialogComponent, {
        width: '30%',
        data: {
          title: this._i18n('Warning'),
          content: this._i18n('Changing the network address may cause this application to stop working properly.')
        }
      }).afterClosed()
        .subscribe(response => {
          if (response) {
            this.submit();
          }
        });
    } else {
      this.submit();
    }
  }

  /**
   * Submit new interface settings to the API
   *
   * @memberof NetworkConfigurationComponent
   */
  submit(): void {
    this._isLoading = true;
    if (this.isStatic('inet')) {
      this.pingInterfaces();
    }
    this._deviceManagementService.updateNetworkConfig(this.interfaceForm.value)
      .pipe(
        finalize(() => this._isLoading = false)

      )
      .subscribe(() => {
        this.onSubmit.emit(this.interfaceForm.value);
        this.interfaceChange.emit(this.interfaceForm.value);
        this._startValue = this.interfaceForm.value;
        this.showSnackMessage(this._i18n('Interface successfully updated'));
      });
  }

  /**
   * Ping interface and show progress dialog.
   *
   */
  pingInterfaces() {
    const currentAddress = this.networkInterface.inet.address.split('/')[0];
    const newAddress = this.interfaceForm.value.inet.address.split('/')[0];
    const rebootDialogRef = this._mdDialog.open(NetworkReconnectionComponent, {
      disableClose: true
    });
    this._DemoAuthService.ping(
      newAddress,
      () => {
        location.replace(`https://${newAddress}`);
      }
    );
  }

  /**
   * Used for determine controls state
   *
   * @readonly
   * @memberof NetworkConfigurationComponent
   */
  get isReadonly(): boolean {
    return this._isLoading;
  }

  /**
   * Display execution status
   *
   * @param {string} message
   * @memberof NetworkConfigurationComponent
   */
  showSnackMessage(message: string): void {
    this._mdSnackBar.open(message, this._i18n('Dismiss') , { duration: 10000 });
  }

  /**
   * True if form was changed
   *
   * @readonly
   * @memberof NetworkConfigurationComponent
   */
  get allowSubmit(): boolean {
    return this.interfaceForm.dirty && this.interfaceForm.touched && this.interfaceForm.valid;
  }

  /**
   * Fields disable logic
   *
   * @param {string} formGroup
   * @memberof NetworkConfigurationComponent
   */
  checkType(formGroup: string): void {
    const address = (this.interfaceForm.controls[formGroup] as FormGroup).controls['address'];
    if (!this.isStatic(formGroup)) {
      address.setValue(null);
      address.disable();
      this.showInputs[formGroup] = false;
    } else {
      address.enable();
      this.showInputs[formGroup] = true;
    }

    const wan = this.interfaceForm.controls['wan'].value;
    const gateway = (this.interfaceForm.controls[formGroup] as FormGroup).controls['gateway'];
    if (this.isStatic(formGroup) && wan) {
      if (formGroup === 'inet') {
        gateway.setValidators([CidrValidators.ipv4Validator]);
      } else {
        gateway.setValidators([CidrValidators.ipv6Validator]);
      }
      gateway.enable();
    } else {
      gateway.setValidators([]);
      gateway.setValue(null);
      gateway.disable();
    }
  }

  /**
   * Start fields disable logic
   *
   * @memberof NetworkConfigurationComponent
   */
  checkFields(): void {
    ['inet', 'inet6'].forEach(element => this.checkType(element));
  }

  /**
   * Is address changed
   *
   * @readonly
   * @memberof NetworkConfigurationComponent
   */
  get addressChanged(): boolean {
    return this._currentIp4Address !== (this.interfaceForm.controls['inet'] as FormGroup).controls['address'].value ||
      this._currentIp6Address !== (this.interfaceForm.controls['inet6'] as FormGroup).controls['address'].value;
  }

  /**
   * Reset form to it previous state
   *
   * @memberof NetworkConfigurationComponent
   */
  reset(): void {
    this.interfaceForm.patchValue(this._startValue);
    this.interfaceForm.markAsPristine();
  }

  /**
   * Check if interface is wireless
   *
   * @readonly
   * @memberof NetworkConfigurationComponent
   */
  get isWireless(): boolean {
    return this.interfaceForm.controls['type'].value === 'wifi';
  }

  /**
   * Return a validation error message for IP v.4 form group.
   *
   * @param {string} controlName              Name of the form control
   * @returns {(string | void)}               Error message
   * @memberof NetworkConfigurationComponent
   */
  getIpv4ControlErrorMessage(controlName: string): string | void {
    const control = (this.interfaceForm.get('inet') as FormGroup).controls[controlName];
    switch (controlName) {
      case 'gateway':
        return control.hasError('required') ?
        this._i18n('Gateway is required for WAN interfaces') :
          control.hasError('invalidCIDR') ? this._i18n('Gateway address is incorrect.') : this._i18n('Value error');
      case 'address':
        return control.hasError('required') ?
        this._i18n('CIDR is required') :
          control.hasError('invalidCIDR') ? this._i18n('Please enter a valid CIDR.') : this._i18n('Value error');
      default:
        break;
    }
  }

  /**
   * Return true if current IP address has static type
   *
   * @param {string} formGroupName            Form group name.
   * @returns {boolean}                       Is address static.
   * @memberof NetworkConfigurationComponent
   */
  isStatic(formGroupName: string): boolean {
    return this.addressFormGroup(formGroupName).controls['type'].value === 'static';
  }

  /**
   * Return form group by it's name.
   *
   * @param {string} formGroupName            Form group name.
   * @returns {FormGroup}                     Form group itself.
   * @memberof NetworkConfigurationComponent
   */
  addressFormGroup(formGroupName: string): FormGroup {
    return this.interfaceForm.controls[formGroupName] as FormGroup;
  }
  /**
   * Form creation routine
   *
   * @private
   * @memberof NetworkConfigurationComponent
   */
  private _createForm(): void {
    this.interfaceForm = this._formBuilder.group({
      idx: [],
      inet: this._formBuilder.group({
        address: ['', CidrValidators.ipv4CidrValidator],
        gateway: [],
        type: []
      }),
      inet6: this._formBuilder.group({
        address: ['', CidrValidators.ipv6Validator],
        gateway: [],
        type: []
      }),
      wpa: this._formBuilder.group({
        pass: [],
        ssid: [],
      }),
      name: [],
      wan: [],
      type: []
    });
  }

  /**
   * Fetch data from the API
   *
   * @private
   * @memberof NetworkConfigurationComponent
   */
  private _fetchData(): void {
    this._deviceManagementService.getNetworkConfig(this.networkInterface.name)
      .subscribe(networkInterface => {
        this._startValue = networkInterface;
        this.interfaceForm.patchValue(networkInterface);
        this._currentIp6Address = networkInterface.inet6.address;
        this._currentIp4Address = networkInterface.inet.address;
        this.checkFields();
        this._isLoading = false;
      });
  }

}
