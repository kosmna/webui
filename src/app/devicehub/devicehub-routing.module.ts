import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { DevicePageComponent } from '@app/cosmyna/pages/device-page';
import { TagPageComponent } from '@app/cosmyna/pages/tag-page';
import { DiscoverPageComponent } from '@app/cosmyna/pages/discover-page';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'devices',
          },
          {
            path: 'tags',
            component: TagPageComponent,
            canActivate: [AuthGuard, LicenseGuard, EulaGuard],
          },
          {
            path: 'devices',
            component: DevicePageComponent,
            canActivate: [AuthGuard, LicenseGuard, EulaGuard],
          },
          {
            path: 'discover',
            component: DiscoverPageComponent,
            canActivate: [AuthGuard, LicenseGuard, EulaGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class cosmynaRoutingModule {}
