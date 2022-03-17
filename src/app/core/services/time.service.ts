import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '@env';
import { HostTime } from '@app/system/models';
import { LocaleService } from '@app/core/services/locale.service';
import { DemoAuthService } from '@app/core/services/loop-edge-auth.service';
import { Notification, NotificationInput } from '@app/loop-notifications/models';
import { NotificationsService } from '@app/loop-notifications/services/notifications.service';

@Injectable()
export class TimeService {
  hostTime: HostTime;
  maxMinDiff = 1;
  showWarning = true;
  intervalMins = 10;
  checkSub: Subscription;
  isWarningShowed = false;

  notificationData: NotificationInput = {
    type: 'notification',
    msg: `Possible time synchronization issue detected. Please make sure ${
      environment.parker ? 'ScoutEdge' : 'Demo'
    }
    time is correct.`,
  };

  constructor(
    private auth: DemoAuthService,
    private locale: LocaleService,
    private _notify: NotificationsService
  ) {}
  /**
   * Interval checks devices date with browser date
   * @memberof TimeService
   */
  checkDate(): void {
    const url = this.locale.localizeUrl('/dm/host/time');

    this.auth.httpClientGet(url)
      .subscribe((hostTime: HostTime) => {
        this.check(hostTime);
      });
  }

  stopCheck(): void {
    if (this.checkSub) {
      this.checkSub.unsubscribe();
    }
  }
  /**
   * convert dates to mili and subtract
   *
   * @param {HostTime} hostTime
   * @memberof TimeService
   */
  private check(hostTime: HostTime): void {
    const browserDate = new Date();
    const deviceTime = new Date(hostTime.utc);

    const diffms = Math.abs(browserDate.getTime() - deviceTime.getTime());
    if (diffms > 1000 * (60 * this.maxMinDiff) && !this.isWarningShowed) {
      this.isWarningShowed = !this.isWarningShowed;

      const notification = new Notification(this.notificationData);
      this._notify.notificationListSource = notification;
      this.isWarningShowed = !this.isWarningShowed;
      // const dialogRef = this._notify
      //   .showDialog(this.warningDialog)
      //   .afterClosed()
      //   .subscribe(() => {
      //     this.isWarningShowed = !this.isWarningShowed;
      //   });
    }
  }
}
