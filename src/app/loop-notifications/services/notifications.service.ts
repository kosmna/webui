import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';

import { HttpErrorResponse } from '@angular/common/http';
import {
  No_Show_Error_Pages,
  No_Show_Error_Urls,
  No_Show_Toolbar_Pages,
} from '@app/loop-notifications/services/blacklist';
import { environment } from '@env';
import { CommonDialogComponent } from '@app/shared/components';
import { CommonDialogContent } from '@app/shared/models';
import { Error, Topbar, Snackbar } from '@app/loop-notifications/models';
import { Notification } from '@app/loop-notifications/models';

@Injectable()
export class NotificationsService {
  /*** Prevents from showing error message snackbar/Top bar, Either page or url */
  readonly noShowErrorUrls: string[] = No_Show_Error_Urls;
  readonly noShowErrorsPages: string[] = No_Show_Error_Pages;
  readonly blackListTopbarRoutes: string[] = No_Show_Toolbar_Pages;

  private globalErrorSource$ = new Subject<Error>();
  private showInternalErrorsSource$: BehaviorSubject< boolean > = new BehaviorSubject<boolean>(true);
  private _notificationListSource$: BehaviorSubject< Notification[] > = new BehaviorSubject([]);
  private errorMessageSource$ = new Subject<Snackbar>();
  private _notificationTopbarSource$ = new Subject<Topbar>();
  private _notificationSnackSource$ = new Subject<Snackbar>();
  private _closeTopbarSource$ = new Subject();

  set notificationTopbarSource(res: Topbar) {
    if (typeof res['closeOnPageChange'] === undefined) {
      res['closeOnPageChange'] = true;
    }
    if (!res['color']) {
      res['color'] = 'accent';
    }
    res['pageUrl'] = this._router.url;
    this._notificationTopbarSource$.next(res);
  }

  set notificationSnackSource(res: Snackbar) {
    this._notificationSnackSource$.next(res);
  }

  set notificationListSource(res: Notification) {
    const listArr = this._notificationListSource$.value;
    listArr.push(res);
    this._notificationListSource$.next(listArr);
  }

  get errorMessage$(): Observable<Snackbar> {
    return this.errorMessageSource$.asObservable();
  }
  get globalError$(): Observable<Error> {
    return this.globalErrorSource$.asObservable();
  }
  get notificationTop$(): Observable<Topbar> {
    return this._notificationTopbarSource$.asObservable();
  }
  get notificationSnack$(): Observable<Snackbar> {
    return this._notificationSnackSource$.asObservable();
  }
  get notificationList$(): Observable<Notification[]> {
    return this._notificationListSource$.asObservable();
  }
  get closeTopbar$(): Observable<any> {
    return this._closeTopbarSource$.asObservable();
  }

  get showInternalErrors$(): BehaviorSubject<boolean> {
    return this.showInternalErrorsSource$;
  }

  constructor(private _router: Router, public dialog: MatDialog) {}
  /**
   * Returns a common Dialog Ref
   *
   * @param {CommonDialogContent} content
   * @param {MatDialogConfig} [matConfig]
   * @returns {MatDialogRef<CommonDialogComponent>}
   * @memberof NotificationsService
   */
  showDialog(
    content: CommonDialogContent,
    matConfig?: MatDialogConfig
  ): MatDialogRef<CommonDialogComponent> {
    return this.dialog.open(
      CommonDialogComponent,
      Object.assign({ data: content }, matConfig)
    );
  }
  /**
   * Errors get added to notification list and/or shown by snack
   *
   * @param {HttpErrorResponse} error
   * @memberof NotificationsService
   */
  handleError(error: HttpErrorResponse): void {
    if (this.showInternalErrorsSource$.value && !environment.production) {
      this.notificationListSource = new Notification(error);
    }

  }

  handleSnackError(msg: {msg: string}): void {
    if (this.currentPageAllowed(this.noShowErrorsPages)) {
      this.errorMessageSource$.next(msg);
    }
  }
  /**
   *  Deletes a notification from notifications list
   * @param {Notification} notification
   * @memberof NotificationsService
   */
  deleteNotification(notification: Notification): void {
    let listArr: Notification[] = this._notificationListSource$.value;
    listArr = listArr
      .filter(res => res !== notification)
      .sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    this._notificationListSource$.next(listArr);
  }
  /**
   *  Delete all notifications from list
   * @memberof NotificationsService
   */
  deleteNotificationAll(): void {
    this._notificationListSource$.next([]);
  }

  setLocalStorage(): void {
    localStorage.setItem(
      'notifications',
      JSON.stringify(this._notificationListSource$.value)
    );
  }

  getLocalStorage(): void {
    const items: Notification[] = JSON.parse(
      localStorage.getItem('notifications')
    );
    if (items) {
      this._notificationListSource$.next(items);
    }
  }
  /**
   * Adds license notification to list
   *
   * @param {Notification} notification
   * @memberof NotificationsService
   */
  addLicenseNotification(notification: Notification): void {
    // see if notification exist
    const notify = this._notificationListSource$.value.find(
      (x: Notification) => x.type === 'license'
    );
    if (notify) {
      this.deleteNotification(notify);
    }

    this.notificationListSource = notification;
  }
  /**
   * Closes Topbar
   * @memberof NotificationsService
   */
  closeTopbar(): void {
    this._closeTopbarSource$.next();
  }


  /**
   *  Checks current page to see
   *  if it is allowed to show error message
   * @private
   * @returns {boolean}
   * @memberof NotificationsService
   */
  private currentPageAllowed(arr: string[]): boolean {
    const currentPath = this._router.url;
    return !arr.includes(currentPath);
  }
}
