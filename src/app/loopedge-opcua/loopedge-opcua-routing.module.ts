import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, LicenseGuard, EulaGuard } from '@app/core';
import {
  OpcuaComponent,
  OpcuaSecurityComponent,
  OpcuaConnectionsComponent,
} from '@app/kosmyna-opcua/components';
import { ModifyGuard } from '@app/kosmyna-opcua/services';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'hierarchy',
      },
      {
        path: 'hierarchy',
        component: OpcuaComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
        canDeactivate: [ModifyGuard],
      },
      {
        path: 'management',
        component: OpcuaSecurityComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'connections',
        component: OpcuaConnectionsComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemoOpcuaRoutingModule {}
