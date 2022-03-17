import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  MatSnackBar,
  MatDialog,
  MatSnackBarRef,
  MatDialogConfig,
} from '@angular/material';
import { NotificationsService } from '@app/loop-notifications/services';
import { filter, skipWhile, map, withLatestFrom } from 'rxjs/operators';

import {
  Snackbar,
  Topbar,
  NotificationInput,
  Notification,
} from '@app/loop-notifications/models';
import { DemoAuthService } from '@app/core/services';
import { CommonDialogContent } from '@app/shared/models';
import { Component_Animations } from './loop-notifications.animations';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-notifications',
  templateUrl: './loop-notifications.component.html',
  styleUrls: ['./loop-notifications.component.scss'],
  animations: Component_Animations,
})
export class LoopNotificationsComponent implements OnInit {
  @Input()
  errorMsg: string;
  @Input()
  closeSnackBtn: string;

  /** Displayed toolbar */
  topbar: Topbar;
  snackRef: MatSnackBarRef<any>;
  displayTopbar: boolean;
  /** For blacklisted routers */
  allowedPageTopbar: boolean;

  private ready = true;
  /** Wait time for snack cool down */
  private readonly waitTime = 5000;
  constructor(
    private _auth: DemoAuthService,
    private _notificationService: NotificationsService,
    private _router: Router,
    private _i18n: I18n,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.watchLicense();

    this._notificationService.errorMessage$.subscribe((snack: Snackbar) => {
      if (this.ready) {
        if (!snack.msg) {
          snack.msg = this.errorMsg;
        }
        this.showSnack(snack);
        this.gracefullyWait();
      }
    });
    /** Topbar messages  **/
    this._notificationService.notificationTop$.subscribe((res: Topbar) => {
      this.showTopbar(res);
    });
    /** snackbar messages  **/
    this._notificationService.notificationSnack$.subscribe((res: Snackbar) => {
      this.showSnack(res);
    });
    /** Router Events
     *  Close all snacks on route change
     *  and check topbar to see if needs to be closed **/
    this._router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        skipWhile(_change => this.displayTopbar === false),
        map((res: NavigationEnd) => res.url),
        withLatestFrom(this._notificationService.notificationTop$)
      )
      .subscribe((arr: [string, Topbar]) => {
        const url = arr[0];
        const topbar = arr[1];
        this.allowedPageTopbar = !this._notificationService.blackListTopbarRoutes.includes(
          url
        );
        // on page change close snack if open
        if (this.snackRef) {
          this.snackRef.dismiss();
          this.snackRef = null;
        }

        if (topbar.closeOnPageChange === true) {
          if (topbar.pageUrl !== url) {
            this.closeTopbar();
          }
        }
      });
    /** Subscribe to close topbar Events  */
    this._notificationService.closeTopbar$.subscribe(() => this.closeTopbar());

    // deadServer
    this._auth.serverDeadSource.subscribe((connection: string) => {
      const snackMsg: Snackbar = { msg: '' };
      if (connection === 'failed') {
        const data: CommonDialogContent = {
          title: this._i18n('Lost Connection To  Server'),
          content: this._i18n('Please reload the page.'),
          submit: 'none',
          cancel: 'none',
        };
        const dialogConfig: MatDialogConfig = {
          minWidth: '85%',
          disableClose: true,
        };
        this._notificationService.showDialog(data, dialogConfig);
      } else {
        if (connection === 'lost') {
          snackMsg.msg = this._i18n('Trying to reconnect...');
          this.ready = false;
        }

        if (connection === 'connected') {
          this.ready = true;
          snackMsg.msg = this._i18n('Reconnected');
        }

        this._notificationService.notificationSnackSource = snackMsg;
      }
    });
  }
  /**
   * Displays topbar
   * @param {Topbar} newTopbar
   * @memberof LoopNotificationsComponent
   */
  showTopbar(newTopbar: Topbar): void {
    // close banner incase it was already open;
    this.displayTopbar = false;
    this.topbar = newTopbar;
    setTimeout(() => {
      this.displayTopbar = true;
    }, 500);
  }
  /**
   * Close topbar
   * @memberof LoopNotificationsComponent
   */
  closeTopbar(): void {
    this.displayTopbar = false;
  }
  /**
   *
   * show snack
   * @param {Snackbar} snack
   * @memberof LoopNotificationsComponent
   */
  showSnack(snack: Snackbar): void {
    setTimeout(() => {
      this.snackRef = this.snackBar.open(
        snack.msg,
        snack.action || this.closeSnackBtn,
        snack.config || {
          duration: this.waitTime,
        }
      );
    });
  }

  watchLicense(): void {
    this._auth.license.subscribe(license => {
      // show notification in how many days
      if (
        license &&
        license.expiryDays <= 15 &&
        !this._auth.isLicensePerpetual
      ) {
        let msg = `Your license will expire in ${license.expiryDays} day${
          license.expiryDays > 1 ? 's' : ''
        }.`;
        if (license.trial) {
          msg += ' This is a trial license, upgrade soon.';
        }
        const notInput = { msg, type: 'license' } as NotificationInput;
        this._notificationService.addLicenseNotification(
          new Notification(notInput)
        );
      }
    });
  }
  /**
   * Cooldown for showing snack messages
   *
   * @private
   * @memberof LoopNotificationsComponent
   */
  private gracefullyWait(): void {
    this.ready = false;
    setTimeout(() => (this.ready = true), this.waitTime);
  }
}
