import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MarketplaceApp } from '@app/marketplace/models';
import { LoaderService } from '@app/loop-loader/services';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'loop-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
})
export class TableViewComponent implements OnInit, OnChanges {
  @Input() applications: MarketplaceApp[];
  @Input() allowedRole: boolean;
  @Output() start: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() stop: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() refresh: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() uninstall: EventEmitter<MarketplaceApp> = new EventEmitter();
  dataSource = new MatTableDataSource<MarketplaceApp>([]);
  columnsDefinition = ['name', 'status', 'statusChangedAt'];
  isLoading: Observable<boolean>;

  constructor(private _loader: LoaderService) {}

  ngOnInit() {
    this.isLoading = this._loader.isLoading$;
    if (this.allowedRole === true) {
      this.columnsDefinition.push('actions');
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.applications.currentValue) {
      this.dataSource.data = this.applications;
    }
  }

  /**
   * Returns true if application is running
   *
   * @param {MarketplaceApp} application
   * @returns {boolean}
   * @memberof TableViewComponent
   */
  isApplicationRunning(application: MarketplaceApp) {
    return application.status === 'Running';
  }

  /**
   * Emit event for application start
   *
   * @param {MarketplaceApp} application
   * @memberof TableViewComponent
   */
  startApplication(application: MarketplaceApp) {
    this.start.emit(application);
  }

  /**
   * Emit event for application stop
   *
   * @param {MarketplaceApp} application
   * @memberof TableViewComponent
   */
  stopApplication(application: MarketplaceApp) {
    this.stop.emit(application);
  }

  /**
   * Emit event for application refresh
   *
   * @param {MarketplaceApp} application
   * @memberof TableViewComponent
   */
  refreshApplication(application: MarketplaceApp) {
    this.refresh.emit(application);
  }

  /**
   * Emit event for application uninstall
   *
   * @param {MarketplaceApp} application
   * @memberof TableViewComponent
   */
  uninstallApplication(application: MarketplaceApp) {
    this.uninstall.emit(application);
  }
}
