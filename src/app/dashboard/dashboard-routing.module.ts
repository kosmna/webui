import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { DashboardPageComponent } from '@app/dashboard/dashboard-page';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'dashboard',
      component: DashboardPageComponent,
      canActivate: [AuthGuard, LicenseGuard, EulaGuard]
    }
  ])],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
