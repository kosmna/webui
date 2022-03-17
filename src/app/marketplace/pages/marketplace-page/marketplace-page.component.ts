import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { EdgeAppService } from '@app/marketplace/services';
import { MarketplaceDialogComponent } from '@app/marketplace/components/marketplace-dialog';
import { Marketplace, MarketplaceApp } from '@app/marketplace/models';
@Component({
  selector: 'loop-marketplace-page',
  templateUrl: './marketplace-page.component.html',
  styleUrls: ['./marketplace-page.component.scss'],
})
export class MarketplacePageComponent implements OnInit, OnDestroy {
  currentMarketplace: Marketplace = {
    name: '',
    branch: '',
    id: '',
    private: false,
    url: '',
  };
  marketplaces: Marketplace[] = [];
  _apps: MarketplaceApp[] = [];
  noMarketplaces = false;
  noApps = false;
  appView = 'cards';

  private _subArray: Subscription[] = [];
  set subArray(sub: Subscription) {
    this._subArray.push(sub);
  }

  get apps(): MarketplaceApp[] {
    this._apps.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    return this._apps;
  }
  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private _edgeAppService: EdgeAppService
  ) {}

  ngOnInit(): void {
    this.subArray = this._edgeAppService
      .getListOfMarketplaces()
      .subscribe(marketplaces => {
        // set defualt marketplace at index 0
        if (marketplaces.length > 0) {
          this.noMarketplaces = false;
          this.currentMarketplace = marketplaces[0];
          this.getApps(this.currentMarketplace);
          this.marketplaces = marketplaces;
        } else {
          this.noMarketplaces = true;
          this.noApps = true;
        }
      });
  }

  toggleView(): void {
    this.appView = this.appView === 'cards' ? 'list' : 'cards';
  }

  getApps(marketplace: Marketplace): void {
    // syncs marketplace then gets apps list
    this._edgeAppService.returnApps(marketplace);
    this.subArray = this._edgeAppService.appsDataStore$.subscribe(apps => {
      if (apps.length > 0) {
        this.noApps = false;
        this._apps = apps;
        // this.sortAlpha();
      } else {
        this.noApps = true;
      }
    });
  }
  // TODO add marketplace sync button
  syncMarketplace(): void {
    this._edgeAppService
      .putSyncMarketplace(this.currentMarketplace.id)
      .subscribe(_ => this.getApps(this.currentMarketplace));
  }

  setMarketplace(marketplace: Marketplace): void {
    this.currentMarketplace = marketplace;
    this.getApps(marketplace);
  }

  appDetails(app: MarketplaceApp): void {
    // TODO: Backdrop causes dialog to open slowly
    const dialogRef = this.dialog.open(MarketplaceDialogComponent, {
      // height: '60%',
      width: '75%',
      data: {
        app: app,
        marketplaceID: this.currentMarketplace.id,
      },
    });
  }
  ngOnDestroy(): void {
    this._subArray.forEach(sub => {
      sub.unsubscribe();
    });
  }
  // sort alphabetically
  sortAlpha(): void {
    this.apps.sort((a, b) => {
      const textA = a.name.toUpperCase();
      const textB = b.name.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }
  redirectConfig(): void {
    this._router.navigate(['apps/configure']);
  }
}
