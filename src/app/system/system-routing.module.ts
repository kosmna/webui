import { AuthGuard, LicenseGuard, RoleGuard, EulaGuard } from '@app/core';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AddOnComponent } from '@app/dynamic';
import { DeviceInfoPageComponent } from './pages/device-info-page/device-info-page.component';
import { CertificatesPageComponent } from './pages/certificates-page/certificates-page.component';
import { NetworkConfigurationPageComponent } from './pages/network-configuration-page/network-configuration-page.component';
import { DeviceManagementPageComponent } from './pages/device-management-page/device-management-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { LicensePageComponent } from './pages/license-page/license-page.component';
import { ConfigPageComponent } from './pages/config-page/config-page.component';
import { LdapComponent } from './pages/ldap/ldap.component';
import { FtpComponent } from './pages/ftp/ftp.component';
import { StatusComponent } from './pages/status/status.component';
import { BackupRestorePageComponent, StorageComponent } from './pages';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full',
      },
      {
        path: 'info',
        component: DeviceInfoPageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'certificates',
        component: CertificatesPageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'network',
        component: NetworkConfigurationPageComponent,
        data: {
          expectedRole: ['administrator'],
        },
        canActivate: [AuthGuard, LicenseGuard, RoleGuard, EulaGuard],
      },
      {
        path: 'device',
        component: DeviceManagementPageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'users',
        component: UsersPageComponent,
        data: {
          expectedRole: ['administrator'],
        },
        canActivate: [AuthGuard, LicenseGuard, RoleGuard, EulaGuard],
      },
      {
        path: 'license',
        component: LicensePageComponent,
        canActivate: [AuthGuard, EulaGuard],
      },
      {
        path: 'config',
        component: ConfigPageComponent,
        data: {
          expectedRole: ['administrator'],
        },
        canActivate: [AuthGuard, LicenseGuard, RoleGuard, EulaGuard],
      },
      {
        path: 'ldap',
        component: LdapComponent,
        data: {
          expectedRole: ['administrator'],
        },
        canActivate: [AuthGuard, LicenseGuard, RoleGuard, EulaGuard],
      },
      {
        path: 'ftp',
        component: FtpComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'status',
        component: StatusComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'backup',
        component: BackupRestorePageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: 'storage',
        component: StorageComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
      {
        path: ':name',
        component: AddOnComponent,
        canActivate: [AuthGuard, LicenseGuard, EulaGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
