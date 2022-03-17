import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { DeviceManagementService } from '@app/system/services';
import { forbiddenNameValidator } from '@app/shared';
import { LoaderService } from '@app/loop-loader/services';
import { NotificationsService } from '@app/loop-notifications';
import {
  HostCountry,
  HostDescription,
  HostInfo,
  HostTimezone,
  Timezones,
} from '@app/system/models';
import { I18n } from '@ngx-translate/i18n-polyfill';
import * as deviceActions from '@app/state/device.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'loop-host-panel',
  templateUrl: './host-panel.component.html',
  styleUrls: ['./host-panel.component.scss'],
})
export class HostPanelComponent implements OnInit {
  hostInfo: HostInfo;
  timezones: Timezones = { timezones: [] };
  isLoading: Observable<boolean>;
  hostForm: FormGroup;
  constructor(
    private _dm: DeviceManagementService,
    private _loader: LoaderService,
    private _fb: FormBuilder,
    private _notify: NotificationsService,
    private _i18n: I18n,
    private _store: Store<any>
  ) {
    // TODO: remove saved hostInfo and methods associated
    this.hostForm = this._fb.group({
      description: [''],
      timezone: [''],
      country: [''],
      ntpInput: [''],
      dnsInput: [''],
    });

    this.hostInfo = {
      country: '',
      description: '',
      dns: [],
      gateway: {
        ipv4: '',
        ipv6: '',
      },
      ntp: [],
      timezone: '',
      hostname: '',
    };
  }

  ngOnInit(): void {
    // Loading observable
    this.isLoading = this._loader.isLoading$;

    this.getHostInfo();
    this._dm
      .getTimezones()
      /* Show Input after getting timezone list  */
      .subscribe(timezones => (this.timezones = timezones));
  }
  /**
   * Get host Info and Update validators with list
   * @memberof HostPanelComponent
   */
  getHostInfo(): void {
    this._dm.getHostInfo().subscribe(info => {
      this.hostInfo = info;
      this.hostInfo.dns = this.initArrays(this.hostInfo.dns);
      this.hostInfo.ntp = this.initArrays(this.hostInfo.ntp);
      this.hostForm.patchValue(info);
      this.hostForm.controls['dnsInput'].setValidators(
        forbiddenNameValidator(this.hostInfo.dns).bind(this)
      );
      this.hostForm.controls['ntpInput'].setValidators(
        forbiddenNameValidator(this.hostInfo.ntp).bind(this)
      );
    });
  }

  /**
   * Hides Edit Panel and Reset Input
   * @param {string} controlName
   * @memberof HostPanelComponent
   */
  cancelUpdate(controlName: string): void {
    this.hostForm.controls[controlName].reset(this.hostInfo[controlName]);
    // this.hostForm.controls[controlName].setErrors(null);
  }
  /**
   * API Call  to set timezone
   * @memberof HostPanelComponent
   */
  setTimezone(): void {
    const timezone: HostTimezone = this.setUpdateBody<HostTimezone>('timezone');
    this._dm.updateHostTimezone(timezone).subscribe(() => {
      this.cancelUpdate('timezone');
      this.showToast(this._i18n('Updated timezone'));
      this.getHostInfo();
    });
  }
  /**
   * Ngclick to update country
   * @memberof HostPanelComponent
   */
  setCountry(): void {
    const country: HostCountry = this.setUpdateBody<HostCountry>('country');
    this._dm.updateHostCountry(country).subscribe(() => {
      this.cancelUpdate('description');
      this.showToast(this._i18n('Updated country'));
      this.getHostInfo();
    });
  }

  setDescription(): void {
    const description = this.setUpdateBody<HostDescription>('description');
    this._dm.updateHostdescription(description).subscribe(() => {
      this.cancelUpdate('description');
      this.showToast(this._i18n('Updated friendly name'));
      this.getHostInfo();
      this._store.dispatch(new deviceActions.LoadDeviceName());
    });
  }
  /**
   * API call to Update ntp list
   * @memberof HostPanelComponent
   */
  updateNtp(): void {
    const body = { ntp: this.hostInfo.ntp };
    this._dm
      .updateHostNtp(body)
      .pipe(finalize(() => this.getHostInfo()))
      .subscribe(_ => {});
  }
  /**
   * Add Ntp to NTP list from ngClick
   * @memberof HostPanelComponent
   */
  addNtp(): void {
    const ntpValue = this.hostForm.controls['ntpInput'].value;
    if (!ntpValue) {
      return;
    }
    this.hostForm.controls['ntpInput'].reset();
    this.hostInfo.ntp.push(ntpValue);
    this.showToast(this._i18n('Added NTP server'));
    this.updateNtp();
  }
  /**
   * NgClick on deleting ntp items
   * @param {number} i
   * @memberof HostPanelComponent
   */
  deleteNtp(i: number): void {
    this.hostInfo.ntp.splice(i, 1);
    this.showToast(this._i18n('Deleted NTP server'));
    this.updateNtp();
  }
  /**
   * Api Call to Update DNS List
   * @memberof HostPanelComponent
   */
  updateDns(): void {
    const body = { dns: this.hostInfo.dns };
    this._dm
      .updateHostDns(body)
      .pipe(finalize(() => this.getHostInfo()))
      .subscribe(() => {});
  }
  /**
   * Ng click for Deleting DNS
   * i = index
   * @param {number} i
   * @memberof HostPanelComponent
   */
  deleteDns(i: number): void {
    this.hostInfo.dns.splice(i, 1);
    this.updateDns();
    this.showToast(this._i18n('Deleted DNS resolver'));
  }
  /**
   * NgClick for adding DNS list
   * @memberof HostPanelComponent
   */
  addDns(): void {
    const dnsValue = this.hostForm.controls['dnsInput'].value;
    if (!dnsValue) {
      return;
    }
    this.hostForm.controls['dnsInput'].reset();
    this.hostInfo.dns.push(dnsValue);
    // call API
    this.updateDns();
    this.showToast(this._i18n('Added DNS resolver'));
  }

  /**
   * Check if control name is valid
   * For disabled Button
   * @param {any} controlName
   * @returns {boolean}
   * @memberof HostPanelComponent
   */
  isControlInvalid(controlName): boolean {
    const control = this.hostForm.controls[controlName];
    return this.hostForm.controls[controlName].invalid && control.value === '';
  }

  private initArrays(arr: any[]): any[] {
    return arr ? arr : [];
  }
  /**
   * Creates body for API calls that do not require a *LIST*
   * @private
   * @template T
   * @param {string} controlName
   * @returns {T}
   * @memberof HostPanelComponent
   */
  private setUpdateBody<T>(controlName: string): T {
    const body = {} as T;
    const value = this.hostForm.controls[controlName].value;
    body[controlName] = value;
    if (controlName === 'description') {
      body['desc'] = value;
    }
    return body;
  }

  private showToast(msg): void {
    this._notify.notificationSnackSource = { msg: msg };
  }
}
