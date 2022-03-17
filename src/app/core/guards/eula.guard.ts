import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { flatMap, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Observable ,  of } from 'rxjs';

import { CommonDialogComponent } from '@app/shared/components';
import { environment } from '@env';
import { Eula } from '@app/core/models/eula';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';

@Injectable()
export class EulaGuard implements CanActivate {
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _matDialog: MatDialog
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return !environment.parker && this._DemoAuthService.needEula
      ? this.prepareEula()
      : of(true);
  }

  /**
   * Check if user need to accept EULA
   *
   * @memberof LoginPageComponent
   */
  checkForEula() {
    const token = this._DemoAuthService.parsedToken;
    if (this._DemoAuthService.needEula) {
      this.prepareEula();
    }
  }

  /**
   * Request EULA from backend and pass it to dialog
   *
   * @memberof AppComponent
   */
  prepareEula() {
    return this._DemoAuthService
      .getEndUserLicenseAgreement()
      .pipe(flatMap(eula => this.showEula(eula)));
  }

  /**
   * Present EULA dialog
   *
   * @param {Eula} eula       - EULA object
   * @memberof AppComponent
   */
  showEula(eula: Eula) {
    return this._matDialog
      .open(CommonDialogComponent, {
        data: {
          title: `End-user License Agreement v. ${eula.version}`,
          htmlContent: eula.text,
          submit: 'Accept',
          cancel: 'Decline',
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        tap(value => {
          if (value) {
            this.acceptEula(eula);
          } else {
            this._DemoAuthService.logout();
          }
        })
      );
  }

  /**
   * Call API for accept end-user license agreement
   *
   * @param {Eula} eula       - EULA object
   * @memberof AppComponent
   */
  acceptEula(eula: Eula) {
    this._DemoAuthService.scopes = this._DemoAuthService.scopes.filter(
      scope => scope !== 'auth:eula'
    );
    this._DemoAuthService
      .acceptEndUserLicenseAgreement(eula)
      .subscribe(() => {
        // this._notify.notificationSnackSource = { msg: 'EULA Accepted' };
      });
  }
}
