import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MarketplaceApp } from '@app/marketplace/models';
import { LoaderService } from '@app/loop-loader/services';

@Component({
  selector: 'loop-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent implements OnInit {
  isLoading: Observable<boolean>;

  @Input() applications: MarketplaceApp[];
  @Input() allowedRole: boolean;
  @Output() start: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() stop: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() refresh: EventEmitter<MarketplaceApp> = new EventEmitter();
  @Output() uninstall: EventEmitter<MarketplaceApp> = new EventEmitter();

  constructor(private _router: Router, private _loader: LoaderService) {}

  ngOnInit() {
    this.isLoading = this._loader.isLoading$;
  }

  /**
   * Returns true if application is running
   *
   * @param {MarketplaceApp} application
   * @returns {boolean}
   * @memberof GridViewComponent
   */
  isApplicationRunning(application: MarketplaceApp) {
    return application.status === 'Running';
  }

  /**
   * Emit event for application start
   *
   * @param {MarketplaceApp} application
   * @memberof GridViewComponent
   */
  startApplication(application: MarketplaceApp) {
    this.start.emit(application);
  }

  /**
   * Emit event for application stop
   *
   * @param {MarketplaceApp} application
   * @memberof GridViewComponent
   */
  stopApplication(application: MarketplaceApp) {
    this.stop.emit(application);
  }

  /**
   * Emit event for application refresh
   *
   * @param {MarketplaceApp} application
   * @memberof GridViewComponent
   */
  refreshApplication(application: MarketplaceApp) {
    this.refresh.emit(application);
  }

  /**
   * Emit event for application uninstall
   *
   * @param {MarketplaceApp} application
   * @memberof GridViewComponent
   */
  uninstallApplication(application: MarketplaceApp) {
    this.uninstall.emit(application);
  }

  showDetails(application: MarketplaceApp) {
    this._router.navigate(['/apps/overview', application.id]);
  }
}
