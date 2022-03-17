import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { skipWhile, flatMap } from 'rxjs/operators';

import { Cert } from '@app/system/models';
import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService } from '@app/core';
import { NotificationsService } from '@app/loop-notifications/services';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { CertificatesDialogComponent } from '../certificates-dialog/certificates-dialog.component';


@Component({
  selector: 'loop-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent implements OnInit {
  certificatesForm: FormGroup;
  certInfo: Cert = {issuer: '', notAfter: '', notBefore: '', subject: '' };
  restrictedView: boolean;
  showForm = false;
  notBeforeValid = false;
  notAfterValid = false;
  constructor(
              private _dm: DeviceManagementService,
              private _notify: NotificationsService,
              private _auth: DemoAuthService,
              private _i18n: I18n,
              public dialog: MatDialog,

            ) { }

  ngOnInit(): void {
    this.grabData();
    this.restrictedView = this._auth.canAccess('administrator');
  }
  grabData(): void {
    this._dm.getCrt()
    .subscribe(cert => {
      this.certInfo = cert;
      const today = new Date();
      const notBefore  = new Date(this.certInfo.notBefore);
      const notAfter = new Date(this.certInfo.notAfter);
      if (today < notBefore) {
        this.notBeforeValid = true;
      }
      if (today > notAfter) {
        this.notAfterValid = true;
      }
    });
  }

  addCert(): void {
    const dialogRef = this.dialog.open(CertificatesDialogComponent);
    dialogRef.afterClosed()
    .pipe(
      skipWhile(res => res === false || res === undefined ),
      flatMap(output => this._dm.postCrt(output))
    )
    .subscribe( _ => {
      this._notify.notificationSnackSource = { msg: this._i18n('Certificate/s added') };
      this.grabData();
    });
  }
}
