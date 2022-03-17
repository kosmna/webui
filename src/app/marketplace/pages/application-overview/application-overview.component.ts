import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as fromMarketplace from '../../state';
import * as applicationActions from '../../state/application.actions';
import { Store, select } from '@ngrx/store';
import { NetworkInformation, PsInfo } from '@app/marketplace/models';
import { Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { UtilityService } from '@app/core';

@Component({
  selector: 'loop-application-overview',
  templateUrl: './application-overview.component.html',
  styleUrls: ['./application-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationOverviewComponent implements OnInit, OnDestroy {
  applicationId: string;
  networkInformation$: Observable<NetworkInformation[]>;
  processInfo$: Observable<PsInfo>;
  selectedContainer$: Observable<NetworkInformation>;
  cpuUtilization$: Observable<{ x: any; y: string | number }[]>;
  cpuUtilizationSeries = ['CPU'];
  cpuSeriesColors = ['#2CA02C'];
  memoryLoad$: Observable<{ x: any; y: string | number }[]>;
  memoryLoadSeries = ['Usage'];
  memorySeriesColors = ['#407FB9'];
  networkUtilization$: Observable<{ x: any; y: string | number }[]>;
  networkUtilizationSeries = ['RX', 'TX'];
  networkSeriesColors = ['#EBE847', '#A19E31'];
  storageIo$: Observable<{ x: any; y: string | number }[]>;
  storageIoSeries = ['Read', 'Write'];
  storageIoColors = ['#3B8D8D', '#63ECEC'];
  applicationLogs$: Observable<string>;
  private _refreshInterval = 3000;
  private _componentActive = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<fromMarketplace.State>,
    private _utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.networkInformation$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationNetworkInformation)
    );
    this.selectedContainer$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationSelectedHost)
    );
    this.cpuUtilization$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationCpuUtilization)
    );
    this.memoryLoad$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationMemoryLoad)
    );
    this.networkUtilization$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationNetworkUtilization)
    );
    this.storageIo$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationStorageIo)
    );
    this.processInfo$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationProcessInfo)
    );
    this.applicationLogs$ = this._store.pipe(
      select(fromMarketplace.getCurrentApplicationLogs)
    );
    this.applicationId = this._activatedRoute.snapshot.paramMap.get(
      'applicationId'
    );
    this._initData();
  }

  ngOnDestroy() {
    this._componentActive = false;
  }

  selectContainer(networkInformation: NetworkInformation) {
    this._store.dispatch(
      new applicationActions.SelectApplicationContainer(networkInformation)
    );
  }

  refreshLogs(): void {
    this._store.dispatch(
      new applicationActions.LoadApplicationLogs(this.applicationId)
    );
  }

  downloadLogs(logs: string): void {
    const fileName = `${this.applicationId}-log.log`;
    this._utilityService.createFile(fileName, 'log', logs);
  }

  private _initData() {
    this._store.dispatch(
      new applicationActions.LoadApplicationNetworkInfo(this.applicationId)
    );
    this._store.dispatch(
      new applicationActions.LoadApplicationPsInfo(this.applicationId)
    );
    this._store.dispatch(
      new applicationActions.LoadApplicationRealtimeInfo(this.applicationId)
    );
    interval(this._refreshInterval)
      .pipe(takeWhile(() => this._componentActive))
      .subscribe(_ => {
        this._store.dispatch(
          new applicationActions.LoadApplicationRealtimeInfo(this.applicationId)
        );
      });
  }
}
