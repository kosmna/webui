import { Component, OnInit } from '@angular/core';
import { DeviceManagementService } from '@app/system/services';
import { DeviceIdentity } from '@app/system/models';

@Component({
  selector: 'loop-identity-page',
  templateUrl: './identity-page.component.html',
  styleUrls: ['./identity-page.component.scss']
})
export class IdentityPageComponent implements OnInit {
  publicKey: DeviceIdentity = { pubKey: '' };

  constructor(private _dm: DeviceManagementService) { }

  ngOnInit(): void {
    this._dm.deviceIdentity()
    .subscribe((publicKey: DeviceIdentity) => {
      this.publicKey = publicKey;
    });
  }

}
