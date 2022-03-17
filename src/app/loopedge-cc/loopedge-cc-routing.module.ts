import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { SubscriptionsResolverService } from '@app/kosmyna-cc/services/subscriptions-resolver.service';
import {
  IntegrationComponent,
  ConnectorsComponent,
  SubscriptionsComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: IntegrationComponent,
    canActivate: [AuthGuard, LicenseGuard, EulaGuard],
    children: [
      {
        path: '',
        component: ConnectorsComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: ':instanceId',
        component: SubscriptionsComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
        resolve: { subscription: SubscriptionsResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoCcRoutingModule {}
