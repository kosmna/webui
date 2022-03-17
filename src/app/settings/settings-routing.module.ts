import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { SettingsPageComponent } from '@app/settings/settings-page';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'settings',
        redirectTo: 'settings/theming',
        pathMatch: 'full',
      },
      {
        path: 'settings/theming',
        component: SettingsPageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
