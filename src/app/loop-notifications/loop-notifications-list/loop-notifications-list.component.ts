import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { of ,  Observable } from 'rxjs';

import { NotificationsService } from '@app/loop-notifications/services';
import { Notification } from '@app/loop-notifications/models';
@Component({
  selector: 'loop-notifications-list',
  templateUrl: './loop-notifications-list.component.html',
  styleUrls: ['./loop-notifications-list.component.scss']
})
export class LoopNotificationsListComponent implements OnInit {
  date: Date;
  text: string;
  notificationList: Observable<Notification[]> = of([]);
  truncatePipe =  [150, '...'];
  datePipe = 'medium';

  constructor(
    private _notify: NotificationsService
  ) { }

  ngOnInit(): void {
    this._notify.getLocalStorage();
    this.notificationList = this._notify.notificationList$
                              .pipe(
                                map(res  => {
                                  res = res.sort((a, b) => a.timestamp > b.timestamp ? -1 : 1);
                                  return res;
                                })
                              );
    this._notify.notificationList$
    .subscribe(() => this._notify.setLocalStorage());
  }

  deleteNotification(notification): void {
    this._notify.deleteNotification(notification);
  }

  deleteAll(): void {
    this._notify.deleteNotificationAll();
  }

}
