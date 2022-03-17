import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { MarketplaceApp } from '@app/marketplace/models';
import { DemoAuthService } from '@app/core';
import { CommonDialogComponent } from '@app/shared';
import { MatDialog } from '@angular/material';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { Store, select } from '@ngrx/store';
import * as fromMarketplace from '../../state';
import * as applicationActions from '../../state/application.actions';

@Component({
  selector: 'loop-apps-page',
  templateUrl: './apps-page.component.html',
  styleUrls: ['./apps-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsPageComponent implements OnInit, OnDestroy {
  @ViewChild('search') search: ElementRef;
  applications$: Observable<MarketplaceApp[]>;
  viewMode = 'cards';
  restrictView: boolean;

  protected destroyed$: Subject<boolean> = new Subject();
  constructor(
    private _auth: DemoAuthService,
    private _matDialog: MatDialog,
    private _i18n: I18n,
    private _store: Store<fromMarketplace.State>
  ) {}

  /**
   * Initialization hook
   *
   * @memberof AppsPageComponent
   */
  ngOnInit(): void {
    this.applications$ = this._store.pipe(
      select(fromMarketplace.getApplications)
    );
    this._store.dispatch(new applicationActions.LoadApplications());
    this.restrictView = this._auth.canAccess('administrator');
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  /**
   * Start application
   *
   * @param {MarketplaceApp} application
   * @memberof AppsPageComponent
   */
  startApplication(application: MarketplaceApp): void {
    this._store.dispatch(
      new applicationActions.StartApplication(application.id)
    );
  }

  /**
   * Stop application
   *
   * @param {MarketplaceApp} application
   * @memberof AppsPageComponent
   */
  stopApplication(application: MarketplaceApp): void {
    this._store.dispatch(
      new applicationActions.StopApplication(application.id)
    );
  }

  /**
   * Refresh application details
   *
   * @param {MarketplaceApp} application
   * @memberof AppsPageComponent
   */
  refreshApplication(application: MarketplaceApp): void {
    this._store.dispatch(
      new applicationActions.RefreshApplicationDetails(application.id)
    );
  }

  confirmApplicationUninstall(application: MarketplaceApp): void {
    this._matDialog
      .open(CommonDialogComponent, {
        width: '50%',
        data: {
          title: this._i18n('Uninstall Application'),
          htmlContent: this
            ._i18n(`Are you sure you want to uninstall this application?
          All application data and configuration files will be removed`),
        },
      })
      .afterClosed()
      .subscribe(answer => {
        if (answer) {
          this.uninstallApplication(application);
        }
      });
  }

  /**
   * Uninstall application
   *
   * @param {MarketplaceApp} application
   * @memberof AppsPageComponent
   */
  uninstallApplication(application: MarketplaceApp): void {
    this._store.dispatch(
      new applicationActions.RemoveApplication(application.id)
    );
  }

  /**
   * Switch view mode and trigger digest
   *
   * @param {string} value
   * @memberof AppsPageComponent
   */
  selectViewMode(value): void {
    this.viewMode = value;
  }
}
