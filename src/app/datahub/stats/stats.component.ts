import { Component, OnInit, OnDestroy,  ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { map } from 'rxjs/operators';

import { StatsTopic, StatsTotal} from '@app/datahub/models';
import { DatahubService } from '@app/datahub/services';
import { CommonDialogContent } from '@app/shared';
import { NotificationsService } from '@app/loop-notifications';
import { Subject ,  Subscription } from 'rxjs';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-datahub-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataHubStatsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() tabIndex: Subject<number>;
  @Input() canAccess: boolean;

  totalSub: Subscription;
  statsSub: Subscription;

  showSearch = false;
  dataSource: MatTableDataSource<StatsTopic>;
  displayedColumns: string[] = ['name', 'numMessages', 'dataVolumeKb' ];
  totalStats: StatsTotal = { dataVolumeKb: '', numMessages: '',  numTopics: '' };
  constructor(private _dbService: DatahubService,
              private _notifyService: NotificationsService,
              private _i18n: I18n,
              ) {
                this.dataSource = new MatTableDataSource([]);
               }

  ngOnInit(): void {

    // From tab group
    this.tabIndex
    .subscribe(index => {
      if (index === 1) {
        this.initStats();
    } else {
      this.stopStats();
    }
    });

  }

  ngOnDestroy(): void {
    this.stopStats();
  }

  initStats(): void {
    this.stopStats();
    // get stats
    this.totalSub = this._dbService.getStats()
    .pipe(
        /**
          * Remove Default Topics not defined by user
         */
      map( res => res.filter(b => b.name !== 'cosmyna.write.>' && b.name !== 'cosmyna.pollonce.>'))
    )
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });

    this.statsSub = this._dbService.getStatsTotal()
    .subscribe(res => this.totalStats = res);
  }

  stopStats(): void {
    if (this.totalSub) {
      this.totalSub.unsubscribe();
    }
    if (this.statsSub) {
      this.statsSub.unsubscribe();
    }
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  resetStats(): void {
    const content: CommonDialogContent = {
      content: this._i18n(`
        Are you sure you want to reset all stats counters to zero? All collected performance data will be permanently removed.
        `),
      submit: this._i18n('Reset Stats')
    };

    this._notifyService.showDialog(content)
    .afterClosed()
    .subscribe(res => {
      if (res) {
        this._dbService.resetStats()
        .subscribe(() => {
          // grab stats
          this.initStats();
        });
      }
    });
  }
}

