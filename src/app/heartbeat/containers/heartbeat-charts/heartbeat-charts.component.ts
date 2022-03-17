import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromHeartbeat from '../../state';
import * as statusActions from '../../state/status.actions';
import { takeWhile, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'loop-heartbeat-charts',
  templateUrl: './heartbeat-charts.component.html',
  styleUrls: ['./heartbeat-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeartbeatChartsComponent implements OnInit, OnDestroy {
  /**
   *
   * CPU Utilization
   *
   */
  cpuUtilization$: Observable<{ x: any; y: string | number }[]>;
  cpuUtilizationSeries = ['CPU'];
  /**
   * Memory Load
   *
   */
  memoryLoad$: Observable<{ x: any; y: string | number }[]>;
  memoryLoadSeries = ['Usage + Cache', 'Usage'];
  memorySeriesColors = ['#79B473', '#F4A460'];
  /**
   *
   * Network Input Utilization
   *
   */
  networkInput$: Observable<{ x: any; y: string | number }[]>;
  networkInputSeries = ['Network Input'];
  networkInputSeriesColor = ['#7389B4'];
  /**
   *
   * Network Output Utilization
   *
   */
  networkOutput$: Observable<{ x: any; y: string | number }[]>;
  networkOutputSeries = ['Network Output'];
  networkOutputSeriesColor = ['#7389B4'];
  private _componentActive = true;
  private readonly _messagesRefreshInterval = 2000;
  constructor(private _store: Store<fromHeartbeat.State>) {}

  ngOnInit() {
    this.cpuUtilization$ = this._store.pipe(
      select(fromHeartbeat.getCpuUtilization),
      filter(value => value.some(element => !!element.x && !!element.y)),
      distinctUntilChanged((a, b) => a[0].x === b[0].x)
    );
    this.memoryLoad$ = this._store.pipe(
      select(fromHeartbeat.getMemoryLoad),
      filter(value => value.some(element => !!element.x && !!element.y)),
      distinctUntilChanged((a, b) => a[0].x === b[0].x)
    );
    this.networkInput$ = this._store.pipe(
      select(fromHeartbeat.getNetworkIn),
      filter(value => value.some(element => !!element.x && !!element.y)),
      distinctUntilChanged((a, b) => a[0].x === b[0].x)
    );
    this.networkOutput$ = this._store.pipe(
      select(fromHeartbeat.getNetworkOut),
      filter(value => value.some(element => !!element.x && !!element.y)),
      distinctUntilChanged((a, b) => a[0].x === b[0].x)
    );
    this._initCharts();
  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  private _initCharts() {
    this._store.dispatch(new statusActions.LoadUtilization());
    interval(this._messagesRefreshInterval)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(_ => {
        this._store.dispatch(new statusActions.LoadUtilization());
      });
  }
}
