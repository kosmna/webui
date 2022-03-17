import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlowsPageComponent } from '@app/flows/flows-page';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core/guards';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'flows',
      component: FlowsPageComponent,
      canActivate: [AuthGuard, LicenseGuard, EulaGuard]
    }
  ])]
})
export class FlowsRoutingModule {}
