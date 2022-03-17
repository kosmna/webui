import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  HeartbeatLicensableParameter,
  API,
  StorageUtilization,
  BarStatuses,
} from '@app/heartbeat/models';
import * as fromHeartbeat from '../../state';
import * as heartbeatActions from '../../state/heartbeat.actions';
import * as statusActions from '../../state/status.actions';
import { Store, select } from '@ngrx/store';
import { Observable, interval } from 'rxjs';
import { takeWhile, map, take } from 'rxjs/operators';

@Component({
  selector: 'loop-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartbeatComponent implements OnInit, OnDestroy {
  devices$: Observable<HeartbeatLicensableParameter>;
  tags$: Observable<HeartbeatLicensableParameter>;
  messagesPerSecond$: Observable<number>;
  flowsNumber$: Observable<number>;
  heartbeatApplications$: Observable<HeartbeatLicensableParameter>;
  loopCloud$: Observable<number>;
  integrations$: Observable<number>;
  remoteNetworks$: Observable<HeartbeatLicensableParameter>;
  api$: Observable<API[]>;
  storageUtilization$: Observable<StorageUtilization>;
  private _componentActive = true;
  private readonly _messagesRefreshInterval = 2000;
  constructor(private _store: Store<fromHeartbeat.State>) {}

  ngOnInit() {
    this.devices$ = this._store.pipe(select(fromHeartbeat.getDevicesInfo));
    this.tags$ = this._store.pipe(select(fromHeartbeat.getTagsInfo));
    this.messagesPerSecond$ = this._store.pipe(
      select(fromHeartbeat.getMessagesPerInterval),
      map(value => (value / this._messagesRefreshInterval) * 1000)
    );
    this.flowsNumber$ = this._store.pipe(select(fromHeartbeat.getFlowsNumber));
    this.heartbeatApplications$ = this._store.pipe(
      select(fromHeartbeat.getApplicationsInfo)
    );
    this.loopCloud$ = this._store.pipe(
      select(fromHeartbeat.getLoopCloudConnections)
    );
    this.integrations$ = this._store.pipe(
      select(fromHeartbeat.getIntegrations)
    );
    this.remoteNetworks$ = this._store.pipe(
      select(fromHeartbeat.getRemoteNetworks)
    );
    this.api$ = this._store.pipe(select(fromHeartbeat.getAvailableApis));
    this.storageUtilization$ = this._store.pipe(
      select(fromHeartbeat.getStorageUtilization)
    );
    this._initHeartbeat();
  }

  ngOnDestroy(): void {
    this._componentActive = false;
  }

  calculateStorageStatus(value: number, total: number): BarStatuses {
    const x = value / total;
    return x <= 0.75
      ? BarStatuses.Normal
      : x > 0.75 && x <= 0.9
      ? BarStatuses.Warning
      : x > 0.9 && x <= 1
      ? BarStatuses.Fail
      : BarStatuses.Unknown;
  }

  private _initHeartbeat() {
    this._store.dispatch(new heartbeatActions.LoadHeartbeatDevices());
    this._store.dispatch(new heartbeatActions.LoadHeartbeatTags());
    interval(this._messagesRefreshInterval)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(_ => {
        this._store.dispatch(new heartbeatActions.LoadHeartbeatMessages());
      });
    this._store.dispatch(new heartbeatActions.LoadHeartbeatFlows());
    this._store.dispatch(new heartbeatActions.LoadHeartbeatApplications());
    this._store.dispatch(new heartbeatActions.LoadHeartbeatLoopCloud());
    this._store.dispatch(new heartbeatActions.LoadHeartbeatIntegrations());
    this._store.dispatch(new heartbeatActions.LoadHeartbeatRemoteNetworks());
    this.api$
      .pipe(take(1))
      .subscribe(apis =>
        apis.forEach(api =>
          this._store.dispatch(new statusActions.LoadModuleStatus(api))
        )
      );
    this._store.dispatch(new statusActions.LoadStorageStatus());
  }
}
