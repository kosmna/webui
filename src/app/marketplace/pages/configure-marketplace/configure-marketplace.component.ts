import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatTableDataSource } from '@angular/material';
import { skipWhile, takeWhile } from 'rxjs/operators';

import { ConfigureDialogComponent } from '@app/marketplace/components/configure-dialog';
import { Marketplace } from '@app/marketplace/models';
import { LoaderService } from '@app/loop-loader';
import { NotificationsService } from '@app/loop-notifications';
import { I18n } from '@ngx-translate/i18n-polyfill';
import * as fromMarketplace from '../../state';
import * as marketplaceActions from '../../state/marketplace.actions';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'loop-configure-marketplace',
  templateUrl: './configure-marketplace.component.html',
  styleUrls: ['./configure-marketplace.component.scss'],
})
export class ConfigureMarketplaceComponent implements OnInit, OnDestroy {
  readonly defaultName = 'Default Marketplace Catalog';
  displayedColumns = ['name', 'branch', 'private', 'actions'];
  mpDatasource = new MatTableDataSource<Marketplace>();
  mpLoading: boolean;
  marketplaces: Marketplace[] = [];
  private _componentActive = true;

  constructor(
    private _loadingService: LoaderService,
    private _notifyService: NotificationsService,
    private _i18n: I18n,
    public dialog: MatDialog,
    private _store: Store<fromMarketplace.State>
  ) {}

  ngOnInit(): void {
    this._store
      .pipe(
        takeWhile(() => this._componentActive),
        select(fromMarketplace.getMarketplaces)
      )
      .subscribe(
        marketplaces =>
          (this.marketplaces = this.mpDatasource.data = marketplaces)
      );
    this.loadMarketplace();
    this._loadingService.isLoading$.subscribe(
      (loading: boolean) => (this.mpLoading = loading)
    );
  }

  ngOnDestroy(): void {
    this._componentActive = false;
  }

  loadMarketplace(): void {
    this._store.dispatch(new marketplaceActions.LoadMarketplaces());
  }

  createMp(): void {
    this.dialog
      .open(ConfigureDialogComponent, {
        width: '50%',
        minWidth: '320px',
        data: {
          default: this.defaultExist,
        },
      })
      .afterClosed()
      .pipe(skipWhile(res => res === undefined))
      .subscribe((res: { default: boolean; data: Marketplace }) => {
        if (res.default === false) {
          this._store.dispatch(
            new marketplaceActions.CreateMarketplace(res.data)
          );
        } else {
          this.addDefaultMarketPlace();
        }
      });
  }

  deleteMp(marketplace: Marketplace): void {
    const data = {
      content: this._i18n('Are you sure you want to delete this marketplace?'),
      submit: this._i18n('Yes'),
    };

    this._notifyService
      .showDialog(data)
      .afterClosed()
      .subscribe(response => {
        if (!response) {
          return;
        }
        this._store.dispatch(
          new marketplaceActions.RemoveMarketplace(marketplace)
        );
      });
  }

  addDefaultMarketPlace(): void {
    this._store.dispatch(new marketplaceActions.CreateDefaultMarketplace());
  }

  get defaultExist(): boolean {
    return !!this.marketplaces.find(
      (x: Marketplace) => x.name === this.defaultName
    );
  }
}
