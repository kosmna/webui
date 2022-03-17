import { NgModule } from '@angular/core';

import { UiThemingModule } from '@app/ui-theming';
import { SharedModule } from '@app/shared';
import { MarketplaceRoutingModule } from '@app/marketplace/marketplace-routing.module';
import { EdgeAppService } from '@app/marketplace/services';
import { SearchFilterPipe } from '@app/shared';
import { EncodedForwardSlashPipe } from '@app/marketplace/pipes/encoded-forward-slash.pipe';

import {
  MarketplaceDialogComponent,
  TableViewComponent,
  GridViewComponent,
  ConfigureDialogComponent,
  MarketplaceAppComponent,
  AppLogComponent,
  RepositoriesDialogComponent,
  RegistryDialogComponent,
  VolumesListComponent,
} from '@app/marketplace/components';

import {
  MarketplacePageComponent,
  ConfigureMarketplaceComponent,
  RegistryComponent,
  AppsPageComponent,
  VolumesComponent,
  ApplicationOverviewComponent,
} from './pages';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/marketplace.reducer';
import { MarketplaceEffects } from './state/marketplace.effects';
import { ApplicationEffects } from './state/application.effects';
import { SharedChartsModule } from '@app/shared-charts';

@NgModule({
  imports: [
    MarketplaceRoutingModule,
    SharedModule,
    SharedChartsModule,
    UiThemingModule,
    StoreModule.forFeature('marketplace', reducer),
    EffectsModule.forFeature([MarketplaceEffects, ApplicationEffects]),
  ],
  declarations: [
    AppsPageComponent,
    MarketplaceDialogComponent,
    MarketplacePageComponent,
    TableViewComponent,
    GridViewComponent,
    ConfigureMarketplaceComponent,
    ConfigureDialogComponent,
    MarketplaceAppComponent,
    RegistryComponent,
    RegistryDialogComponent,
    RepositoriesDialogComponent,
    EncodedForwardSlashPipe,
    AppLogComponent,
    VolumesComponent,
    VolumesListComponent,
    ApplicationOverviewComponent,
  ],
  providers: [EdgeAppService, SearchFilterPipe],
  entryComponents: [
    MarketplaceDialogComponent,
    ConfigureDialogComponent,
    RegistryDialogComponent,
    RepositoriesDialogComponent,
  ],
})
export class MarketplaceModule {}
