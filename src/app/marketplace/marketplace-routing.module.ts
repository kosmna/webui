import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, RoleGuard, EulaGuard } from '@app/core';

import {
  MarketplacePageComponent,
  ConfigureMarketplaceComponent,
  RegistryComponent,
  AppsPageComponent,
  VolumesComponent,
  ApplicationOverviewComponent,
} from './pages';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        component: AppsPageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'marketplace',
        component: MarketplacePageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'configure',
        component: ConfigureMarketplaceComponent,
        data: {
          expectedRole: ['administrator'],
        },
        canActivate: [AuthGuard, LicenseGuard, RoleGuard, EulaGuard],
      },
      {
        path: 'registry',
        component: RegistryComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'overview/:applicationId',
        component: ApplicationOverviewComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'volumes',
        component: VolumesComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule {}
