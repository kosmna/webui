import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { Device, DeviceCommunicationType, DeviceParity } from '@app/cosmyna/models';
import { I18n } from '@ngx-translate/i18n-polyfill';
@Component({
  selector: 'loop-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent {
  @Input() allowedRole: boolean;
  @Input('device') device: Device;
  @Input() disabledLoading: Observable<boolean>;
  @Output() refresh: EventEmitter<Device> = new EventEmitter();
  @Output() edit: EventEmitter<Device> = new EventEmitter();
  @Output() delete: EventEmitter<Device> = new EventEmitter();

  constructor(
    private _i18n: I18n
  ) { }

  // changes color for loop-tag-directive
  tagColor(status?): string {
    return status === 'OK' ? 'enabled' : 'disabled';
  }

  tagName(status?): string {
    if (!status) {
      return this._i18n({value: 'POLLING', description: 'device card status'});
    } else {
      return status === 'OK' ? this._i18n({value: 'CONNECTED', description: 'device card status'}) : status;
    }
  }

  headerClass(status?): string {
    return status === 'OK' ?  'device-card__header--enabled-top-border' : 'device-card__header--disabled-top-border';
  }

  getType(device: Device): string {
    return DeviceCommunicationType[device.driver.interfaceType];
  }

  get parity(): any {
    return DeviceParity[this.device.properties.parity];
  }

}
