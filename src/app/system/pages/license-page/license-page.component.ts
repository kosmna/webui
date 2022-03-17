import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { CommonDialogComponent, CommonDialogContent } from '@app/shared';
import { AppLicense, DemoAuthService, UtilityService } from '@app/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-license-page',
  templateUrl: './license-page.component.html',
  styleUrls: ['./license-page.component.scss'],
})
export class LicensePageComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  key = '';
  license: AppLicense;
  deactivateDialogContent: CommonDialogContent = {
    content: this._i18n('Are you sure you want to deactivate your license?'),
  };
  activeOffKey = false;
  deactiveOffKey = false;
  isValid: boolean;
  isLoadingDeactiveOnline: string;
  isLoadingActivateOnline: string;
  isLoadingDeactiveOffline: string;
  isLoadingActivateOffline: string;
  isLicensePerpetual: boolean;
  isLoadingActivateReqOffline: string;
  onlineActivation: FormGroup;
  offlineRequest: FormGroup;
  offlineActivation: FormGroup;
  restrictedView: boolean;

  constructor(
    public dialog: MatDialog,
    private _auth: DemoAuthService,
    private _formBuilder: FormBuilder,
    private _i18n: I18n,
    private _utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.restrictedView = this._auth.canAccess('administrator');
    this._auth.license.subscribe(license => {
      this.license = license;
      this.isValid = this.license.status === 'OK' ? true : false;
      this.isLicensePerpetual = this._auth.isLicensePerpetual;
    });
    if (this.restrictedView) {
      this.onlineActivation = this._formBuilder.group({
        licenseKey: [''],
      });
      this.offlineRequest = this._formBuilder.group({
        licenseKey: [''],
      });

      this.offlineActivation = this._formBuilder.group({
        licenseKey: [''],
      });
    }
  }

  /**
   * Reset operations results
   *
   * @memberof ManageLicenseComponent
   */
  resetResults() {
    this.isLoadingActivateOnline = this.isLoadingActivateOffline =
      this.isLoadingActivateReqOffline = this.isLoadingActivateOffline =
        this.isLoadingDeactiveOffline = '';
  }

  /**
   * Show confirmation dialog, performs online deactivation and refresh license
   *
   * @memberof ManageLicenseComponent
   */
  deactivateLicense() {
    this.resetResults();

    this.dialog
      .open(CommonDialogComponent, {
        data: this.deactivateDialogContent,
      })
      .afterClosed()
      .subscribe(result => {
        if (result === false) {
          return;
        }

        this.isLoadingDeactiveOnline = 'loading';
        this._auth
          .deactivateLicense()
          .subscribe(
            () => (this.isLoadingDeactiveOnline = 'loaded'),
            _ => (this.isLoadingDeactiveOnline = 'failed'),
            () => this._auth.getLicense()
          );
      });
  }

  /**
   * Performs request for offline activation
   *
   * @memberof ManageLicenseComponent
   */
  requestOfflineActivation() {
    this.resetResults();
    const licenseKey = this.offlineRequest.controls['licenseKey'].value;
    if (licenseKey === '') {
      return;
    }

    this.isLoadingActivateReqOffline = 'loading';
    this._auth.requestOfflineActivation(licenseKey).subscribe(
      requestResult => {
        this.isLoadingActivateReqOffline = 'loaded';
        this.activeOffKey = true;
        this.key = requestResult.value;
        this.offlineRequest.reset();
      },
      error => {
        this.isLoadingActivateReqOffline = 'failed';
      }
    );
  }

  /**
   * Performs offline activation and refresh license
   *
   * @returns {void}
   * @memberof ManageLicenseComponent
   */
  activateOffline(): void {
    this.resetResults();

    const licenseKey = this.offlineActivation.controls['licenseKey'].value;
    if (licenseKey === '') {
      return;
    }
    this.isLoadingActivateOffline = 'loading';
    this._auth.activateLicenseOffline(licenseKey).subscribe(
      () => {
        this.isLoadingActivateOffline = 'loaded';
        this.offlineActivation.reset();
        this.cleanPage();
      },
      _ => (this.isLoadingActivateOffline = 'failed'),
      () => this._auth.getLicense()
    );
  }

  /**
   * Performs online license activation and refresh license
   *
   * @returns {void}
   * @memberof ManageLicenseComponent
   */
  activateLicense(): void {
    this.resetResults();

    const licenseKey = this.onlineActivation.controls['licenseKey'].value;
    if (licenseKey === '') {
      return;
    }
    this.isLoadingActivateOnline = 'loading';
    this._auth.activateLicense(licenseKey).subscribe(
      () => {
        this.isLoadingActivateOnline = 'loaded';
        this.onlineActivation.reset();
        this.cleanPage();
      },
      _ => (this.isLoadingActivateOnline = 'failed'),
      () => this._auth.getLicense()
    );
  }

  /**
   * Performs a request for offline deactivation and refresh license
   *
   * @memberof ManageLicenseComponent
   */
  deactivateOffline() {
    this.resetResults();

    this.dialog
      .open(CommonDialogComponent, {
        data: this.deactivateDialogContent,
      })
      .afterClosed()
      .subscribe(result => {
        if (result === false) {
          return;
        }

        this.isLoadingDeactiveOffline = 'loading';
        this._auth.requestOfflineDeactivation().subscribe(
          requestResult => {
            this.isLoadingDeactiveOffline = 'loaded';
            this.deactiveOffKey = true;
            this.key = requestResult.value;
          },
          _ => {
            this.isLoadingDeactiveOffline = 'failed';
          },
          () => this._auth.getLicense()
        );
      });
  }

  /**
   * Check if user allowed to activate/deactivate license
   *
   * @readonly
   * @memberof LicensePageComponent
   */
  get allowManageLicense() {
    return this._auth.checkPermission('auth:license');
  }

  /**
   * Cleanup page from unneded keys.
   *
   * @memberof LicensePageComponent
   */
  cleanPage() {
    this.activeOffKey = this.deactiveOffKey = false;
  }
  /**
   * Downloads offline activation key
   */
  downloadTxt(res: {key: string, type: string}): void {
    this._utilityService.createFile(
      `${res.type}-key-${Date.now()}`,
      'txt',
      res.key
    );
  }

  /**
   * Check if license is not undefined, null or empty
   *
   * @readonly
   * @memberof LicensePageComponent
   */
  get licenseExists() {
    return (
      this.license &&
      !(
        Object.keys(this.license).length === 0 &&
        this.license.constructor === AppLicense
      )
    );
  }
}
