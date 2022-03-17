import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard } from '@app/core';
import { DatahubPageComponent } from '@app/datahub/datahub-page';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DatahubPageComponent,
        canActivate: [AuthGuard, LicenseGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class DatahubRoutingModule {}
