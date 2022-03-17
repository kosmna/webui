import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatPaginator,
  MatSort,
} from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { DatahubService } from '@app/datahub/services';
import { CloudConnector } from '@app/datahub/models';
import { CloudConnectorDataSource } from '@app/datahub/cloud-connectors/cloud-connector.datasource';
import { CloudConnectorsDialogComponent } from '@app/datahub/cloud-connectors-dialog';
import { DemoAuthService } from '@app/core';
import { NotificationsService } from '@app/loop-notifications';

@Component({
  selector: 'loop-cloud-connectors',
  templateUrl: './cloud-connectors.component.html',
  styleUrls: ['./cloud-connectors.component.scss'],
})
export class CloudConnectorsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: CloudConnectorDataSource | null;
  columnsDefinition = ['id', 'name', 'uri', 'clientID', 'status'];
  connectorsSubscription: Subscription;
  statusSubscriptions = new Map<string, Subscription>();
  restrictedView: boolean;
  private stopSubscriptionStream$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialog: MatDialog,
    private _dataHubService: DatahubService,
    private _mdSnackBar: MatSnackBar,
    private _auth: DemoAuthService,
    private _notifyService: NotificationsService,
    private _observableMedia: ObservableMedia
  ) {}

  /**
   * Lifecycle hook
   * Setting up datasource and filter.
   *
   * @memberof CloudConnectorsComponent
   */
  ngOnInit() {
    this.restrictedView = this._auth.canAccess('administrator');

    this._dataHubService.getCloudConnectors();
    this.dataSource = new CloudConnectorDataSource(this.paginator, this.sort);
    this._dataHubService.cloudConnectors$.subscribe(res => {
      this.dataSource.data = res;
    });

    this.connectorsSubscription = this._dataHubService.cloudConnectors$.subscribe(
      connectors =>
        connectors.forEach(connector => this.refreshConnectorStatus(connector))
    );

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

  ngOnDestroy() {
    this.connectorsSubscription.unsubscribe();
    this.stopSubscriptionStream$.next(true);
  }

  /**
   * Show connector creation dialog and refreshes connectors list.
   *
   * @memberof CloudConnectorsComponent
   */
  addConnector() {
    this.dialog
      .open(CloudConnectorsDialogComponent, {
        height: '87',
        width: '80%',
      })
      .afterClosed()
      .subscribe(connector => {
        if (connector) {
          this.stopSubscriptionStream$.next(true);
          this._dataHubService.emitChange(
            this._dataHubService.cloudConnectors$,
            connector
          );
        }
      });
  }

  /**
   * Remove connector
   *
   * @param {string} connector
   * @memberof CloudConnectorsComponent
   */
  removeConnector(connector: CloudConnector) {
    const data = {
      content: 'Are you sure you want to delete this cloud connector?',
      submit: 'Yes',
    };

    const dialogRef = this._notifyService
      .showDialog(data)
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this._dataHubService.deleteCloudConnector(connector).subscribe(() => {
            this.stopSubscriptionStream$.next(true);
            this._dataHubService.emitRemoval(
              this._dataHubService.cloudConnectors$,
              connector
            );
            this._dataHubService.getRawSubs();
          });
        }
      });
  }

  /**
   * Show connector edit dialog and refreshes connectors list.
   *
   * @param {CloudConnector} connector
   * @memberof CloudConnectorsComponent
   */
  editConnector(connector: CloudConnector) {
    this.dialog
      .open(CloudConnectorsDialogComponent, {
        height: '87',
        width: '80%',
        data: connector,
      })
      .afterClosed()
      .subscribe(newConnector => {
        if (newConnector) {
          this.stopSubscriptionStream$.next(true);
          // this._dataHubService.emitChange(this._dataHubService.cloudConnectors$, newConnector);
          this._dataHubService.getCloudConnectors();
          const rawSubscription = this._dataHubService.rawSubscriptions.find(
            topic => topic.cloudConnector.id === newConnector.id
          );
          if (rawSubscription) {
            rawSubscription.cloudConnector = newConnector;
          }
        }
      });
  }

  /**
   * Shows error snack
   *
   * @param {any} message
   * @param {any} action
   * @memberof CloudConnectorsComponent
   */
  showSnackMessage(message, action) {
    this._mdSnackBar.open(message, action, { duration: 5000 });
  }

  /**
   * Set cloud connector status
   *
   * @param {CloudConnector} connector
   * @memberof CloudConnectorsComponent
   */
  refreshConnectorStatus(connector: CloudConnector) {
    if (this.statusSubscriptions.get(connector.id)) {
      this.statusSubscriptions.get(connector.id).unsubscribe();
    }
    this.statusSubscriptions.set(
      connector.id,
      this._dataHubService
        .getCloudConnectorStatus(connector.id)
        .subscribe(status => {
          connector.state = status;
          if (status.status !== 'DISABLED') {
            this.pollConnectorStatus(connector);
          }
        })
    );
  }

  /**
   * Poll cloud connector status
   *
   * @param {CloudConnector} connector
   * @memberof CloudConnectorsComponent
   */
  pollConnectorStatus(connector: CloudConnector) {
    this._dataHubService
      .pollCloudConnectorStatus(connector.id)
      .pipe(takeUntil(this.stopSubscriptionStream$))
      .subscribe(status => {
        connector.state = status;
        this.pollConnectorStatus(connector);
      });
  }

  /**
   * Enable/disable cloud connector
   *
   * @param {CloudConnector} connector - Cloud connector object
   * @memberof CloudConnectorsComponent
   */
  toggleConnector(connector: CloudConnector) {
    const observable =
      connector.state.status !== 'DISABLED'
        ? this._dataHubService.disableCloudConnector(connector)
        : this._dataHubService.enableCloudConnector(connector);

    observable.subscribe(() => this.refreshConnectorStatus(connector));
  }

  /**
   * Check if connector is enabled
   *
   * @param {CloudConnector} connector  - Cloud connector to check
   * @returns {boolean}                 - Verification result
   * @memberof CloudConnectorsComponent
   */
  isConnectorEnabled(connector: CloudConnector) {
    return connector.state && connector.state.status !== 'DISABLED';
  }

  /**
   * Set columns definition based on media size.
   *
   * @param {string} mediaChange        Media size trigger
   * @memberof CloudConnectorsComponent
   */
  loadContentBasedMedia(mediaChange?: string) {
    switch (mediaChange) {
      case 'xs':
        this.columnsDefinition = ['name'];
        break;
      case 'sm':
        this.columnsDefinition = ['name', 'uri'];
        break;
      default:
        this.columnsDefinition = ['name', 'uri', 'status'];
        break;
    }

    if (this.restrictedView) {
      // allow actions
      this.columnsDefinition.push('actions');
    }
  }

  /**
   * Check media size on page load
   *
   * @memberof CloudConnectorsComponent
   */
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
