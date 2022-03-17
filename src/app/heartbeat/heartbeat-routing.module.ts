import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeartbeatComponent } from './containers';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    component: HeartbeatComponent,
    canActivate: [AuthGuard, LicenseGuard, EulaGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeartbeatRoutingModule {}
