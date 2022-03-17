import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import { SensonodeComponent } from '@app/sensonode/pages/sensonode';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: SensonodeComponent,
      canActivate: [AuthGuard, LicenseGuard, EulaGuard]
  }
  ])],
  exports: [
    RouterModule
  ]
})
export class SensonodeRoutingModule { }
