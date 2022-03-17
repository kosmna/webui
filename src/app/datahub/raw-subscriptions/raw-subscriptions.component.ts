import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { filter, skipWhile, switchMap } from 'rxjs/operators';

import { DatahubService } from '@app/datahub/services';
import { RawSubscriptionsDataSource } from '@app/datahub/raw-subscriptions/raw-subscriptions.datasource';
import { RawSubscriptionDialogComponent } from '@app/datahub/raw-subscription-dialog';
import { RawSub } from '@app/datahub/models';
import { DemoAuthService } from '@app/core';
import { NotificationsService } from '@app/loop-notifications';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'loop-raw-subscriptions',
  templateUrl: './raw-subscriptions.component.html',
  styleUrls: ['./raw-subscriptions.component.css'],
})
export class RawSubscriptionsComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild (MatSort)
  sort: MatSort;

  dataSource: RawSubscriptionsDataSource;

  columnsDefinition = [
    'name',
    'description',
    'cloudConnectorURI',
    'cloudConnectorName',
    'topicStatus',
  ];
  restrictedView: boolean;

  constructor(
    private _dialog: MatDialog,
    private _dataHubService: DatahubService,
    private _auth: DemoAuthService,
    private _notifyService: NotificationsService,
    private _observableMedia: ObservableMedia
  ) {}

  /**
   * Initialization lifecycle hook
   *
   * @memberof RawSubscriptionsComponent
   */
  ngOnInit() {
    this.restrictedView = this._auth.canAccess('administrator');
    this.dataSource = new RawSubscriptionsDataSource(
      this._dataHubService,
      this.paginator,
      this.sort,
    );
    this._dataHubService.getRawSubs();

    this._observableMedia
      .asObservable()
      .pipe(
        filter(
          (mediaChange: MediaChange) =>
            mediaChange.mqAlias === 'lg' ||
            mediaChange.mqAlias === 'md' ||
            mediaChange.mqAlias === 'sm' ||
            mediaChange.mqAlias === 'xs'
        )
      )
      .subscribe((mediaChange: MediaChange) =>
        this.loadContentBasedMedia(mediaChange.mqAlias)
      );

    this.checkMediaOnLoad();
  }

  /**
   * Add subscription to topic
   *
   * @memberof RawSubscriptionsComponent
   */
  subscribeToTopic() {
    this._dialog
      .open(RawSubscriptionDialogComponent, {
        height: '87',
        width: '80%',
      })
      .afterClosed()
      .pipe(
        skipWhile(res => res === false || res === undefined),
        switchMap(topic => this._dataHubService.addTopic(topic))
      )
      .subscribe(() => this._dataHubService.getRawSubs());
  }

  /**
   * Remove subscription from topic
   *
   * @param {RawSub} topic
   * @memberof RawSubscriptionsComponent
   */
  unsubscribeFromTopic(topic: RawSub) {
    const data = {
      content: 'Are you sure you want to delete this topic?',
      submit: 'Yes',
    };

    const dialogRef = this._notifyService
      .showDialog(data)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this._dataHubService.removeTopic(topic).subscribe(() => {
            this._dataHubService.rawSubscriptions$.next(
              this._dataHubService.rawSubscriptions.filter(
                element => element.id !== topic.id
              )
            );
          });
        }
      });
  }

  /**
   * Update topic
   *
   * @param {RawSub} topic
   * @memberof RawSubscriptionsComponent
   */
  editConnector(topic: RawSub) {
    this._dialog
      .open(RawSubscriptionDialogComponent, {
        height: '87',
        width: '80%',
        data: topic,
      })
      .afterClosed()
      .pipe(
        skipWhile(res => res === false || res === undefined),
        switchMap(updatedTopic =>
          this._dataHubService.updateTopic(updatedTopic)
        )
      )
      .subscribe(() => this._dataHubService.getRawSubs());
  }

  /**
   * Toggle topic status
   *
   * @param {RawSub} topic                - Topic
   * @memberof RawSubscriptionsComponent
   */
  toggleTopic(topic: RawSub) {
    const observable = topic.enabled
      ? this._dataHubService.disableTopic(topic)
      : this._dataHubService.enableTopic(topic);
    const message = `Topic ${topic.enabled ? 'disabled' : 'enabled'}.`;
    observable.subscribe(() => {
      this._notifyService.notificationSnackSource = { msg: message };
      topic.enabled = !topic.enabled;
    });
  }

  loadContentBasedMedia(mediaChange?: string) {
    switch (mediaChange) {
      case 'xs':
        this.columnsDefinition = ['name'];
        break;
      case 'sm':
        this.columnsDefinition = [
          'name',
          'cloudConnectorURI',
          'cloudConnectorName',
          'topicStatus',
        ];
        break;
      case 'xl':
        this.columnsDefinition = [
          'name',
          'description',
          'cloudConnectorURI',
          'cloudConnectorName',
          'topicStatus',
        ];
        break;
      default:
        this.columnsDefinition = [
          'name',
          'cloudConnectorURI',
          'cloudConnectorName',
          'topicStatus',
        ];
        break;
    }
    if (this.restrictedView) {
      this.columnsDefinition.push('actions');
    }
  }

  checkMediaOnLoad() {
    if (this._observableMedia.isActive('xs')) {
      this.loadContentBasedMedia('xs');
    } else if (this._observableMedia.isActive('sm')) {
      this.loadContentBasedMedia('sm');
    } else {
      this.loadContentBasedMedia();
    }
  }
}
