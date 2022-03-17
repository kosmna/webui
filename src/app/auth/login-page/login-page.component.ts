import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription,  of } from 'rxjs';
import { tap ,  catchError ,  finalize, flatMap, map } from 'rxjs/operators';

import { DemoAuthService, Eula, LoginProvider } from '@app/core';
import { UserChangePwd } from '@app/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NotificationsService } from '@app/loop-notifications/services';
import { CommonDialogComponent } from '@app/shared';

@Component({
  selector: 'loop-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  errSub: Subscription;
  connectionError = false;
  credentialError = false;
  resetPassword = false;
  resetPasswordError = false;
  loadingReset = false;
  loadingLogin = false;
  checkingLogin = true;
  successful: boolean;
  loggedInReset: boolean;
  logo: string;
  providers: LoginProvider[];
  readonly internalPName = 'Internal';

  constructor(
    private _auth: DemoAuthService,
    private _router: Router,
    private _notify: NotificationsService,
    public snackBar: MatSnackBar,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loggedInReset = this._router.isActive('/resetpassword', false);
    this.resetPassword = this.shouldResetPassword();
    if (!this.resetPassword) {
      this._auth.checkIfLoggedIn()
      .subscribe(result => {
        this.resetPassword = result.mustChangePassword;
        this.checkingLogin = false;
        if (result.success && !this.resetPassword) {
          this.credentialError = false;
          this._router.navigate([this._auth.redirectUrl]);
        }
      });

      this._auth.getLogin()
      .pipe(
        map((res) => {
          if (res[0].name === '') {
            res[0].name = this.internalPName;
          }
          return res;
        })
      )
      .subscribe((res) => {
        this.providers = res;
      });

    } else {
      this.checkingLogin = false;
    }
    this.errSub = this._notify.globalError$.subscribe(error => {
      const message = error.msg;
      const msg = { msg: message };
      this._notify.notificationSnackSource = msg;
    });

  }

  ngOnDestroy() {
    this.errSub.unsubscribe();
  }

  shouldResetPassword(): boolean {
    return (
      this._auth.shouldUserChangePass() ||
      this._router.isActive('/resetpassword', false)
    );
  }

  tryLogin(loginData: { username: string; password: string, providerId?: string }) {

    this.loadingLogin = true;
    this.credentialError = false;
    this._auth
      .login(loginData)
      .pipe(
        catchError(() => {
          this.connectionError = true;
          const loginResult = {
            success: false,
            mustChangePassword: false,
            mustAcceptEULA: false,
          };
          return of(loginResult);
        }),
        finalize(() => (this.loadingLogin = false))
      )

      .subscribe(loginResult => {
        if (loginResult.success) {
          this.credentialError = false;
          if (loginResult.mustChangePassword) {
            this.resetPassword = true;
            if (loginResult.mustAcceptEULA) {
              this.showEulaOnFirstLogin();
            }
          } else {
            this._router.navigate([this._auth.redirectUrl]);
          }
        } else {
          this.credentialError = true;
        }
      });
  }

  /**
   * Call logout and drop resetPassword flag to go to login page
   *
   * @memberof LoginPageComponent
   */
  logout() {
    this._auth.logout();
    this.resetPassword = false;
  }

  onPasswordReset(pass: UserChangePwd): void {
    const forceReset = this._auth.shouldUserChangePass();
    this.loadingReset = true;
    this._auth
      .changePassword(pass)
      .pipe(finalize(() => (this.loadingReset = false)))
      .subscribe(
        () => {
          this.successful = true;

          this.resetPasswordError = false;
          if (forceReset) {
            this._auth.logout();
            this.resetPassword = false;
          } else if (!forceReset) {
            const message = 'Password successfully changed!';
            this.snackBar.open(message, 'close', {
              duration: 3500,
            });
          }

          const data = this._auth.userData;
          const username = data.username;
          // const providerId  = this._auth.providerId;
          this.tryLogin({ username: username, password: pass.newPassword });
        },
        () => {
          this.connectionError = true;
          this.successful = false;
        }
      );
  }

  showEulaNotLoggedIn(): void {
    this._auth
      .getEndUserLicenseAgreement()
      .pipe(
        flatMap(eula => {
          return this._matDialog
            .open(CommonDialogComponent, {
              data: {
                title: `End-user License Agreement v. ${eula.version}`,
                htmlContent: eula.text,
                submit: 'Close',
                cancel: 'none',
              },
              disableClose: true,
            })
            .afterClosed();
        })
      )

      .subscribe();
  }

  showEulaOnFirstLogin(): void {
    this._auth
      .getEndUserLicenseAgreement()
      .pipe(flatMap(eula => this.showEula(eula)))
      .subscribe();
  }

  /**
   * Request EULA from back-end and pass it to dialog
   *
   * @memberof AppComponent
   */
  prepareEula() {
    return this._auth
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
          eula: true,
        },
        disableClose: true,
      })
      .afterClosed()
      .pipe(
        tap(value => {
          if (value) {
            this.acceptEula(eula);
          } else {
            this.logout();
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
    this._auth.scopes = this._auth.scopes.filter(
      scope => scope !== 'auth:eula'
    );
    this._auth.acceptEndUserLicenseAgreement(eula).subscribe(() => {
      // this._notify.notificationSnackSource = { msg: 'EULA Accepted' };
    });
  }


}
