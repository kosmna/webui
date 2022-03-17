import { NgModule } from '@angular/core';
import { SharedModule, CommonDialogComponent } from '@app/shared';
import {
  AddOnsService,
  ElementsDialogComponent,
  AddDialogComponent,
  DynamicModule,
} from '@app/dynamic';
import { UiThemingModule } from '@app/ui-theming';
import { SystemRoutingModule } from '@app/system/system-routing.module';

import {
  FtpService,
  StatusService,
  DeviceManagementService,
} from '@app/system/services';
import {
  BackupComponent,
  CertificatesComponent,
  FileUploadDialogComponent,
  FtpUserDialogComponent,
  HostPanelComponent,
  NetworkConfigurationComponent,
  NetworkReconnectionComponent,
  RebootDialogComponent,
  RemoteAccessCardComponent,
  RemoteAccessComponent,
  RemoteAccessJoinDialogComponent,
  StatusIndicatorComponent,
  UserDialogComponent,
  CertificatesCertstoreComponent,
  CertstoreDetailDialogComponent,
  ModemPanelComponent,
  ModemConfigPanelComponent,
  ModemConfigDialogComponent,
  InfoMemoryPanelComponent,
  TemplatePageComponent,
  TemplatePanelComponent,
  StorageListComponent,
  EditStorageComponent,
  ActivationUrlComponent,
  KeyContainerComponent,
} from './components';
import { CertificatesDialogComponent } from './components/certificates-dialog';
import {
  ConfigPageComponent,
  DeviceInfoPageComponent,
  DeviceManagementPageComponent,
  FtpComponent,
  LdapComponent,
  LicensePageComponent,
  NetworkConfigurationPageComponent,
  StatusComponent,
  UsersPageComponent,
  CertificatesPageComponent,
  IdentityPageComponent,
  BackupRestorePageComponent,
  StorageComponent,
} from './pages';
import { LdapEditDialogComponent } from './components/ldap-edit-dialog';
import { SystemMenuItem } from '.';
import { WifiQualityComponent } from './components/wifi-quality/wifi-quality.component';

@NgModule({
  imports: [DynamicModule, SharedModule, SystemRoutingModule, UiThemingModule],
  declarations: [
    BackupComponent,
    CertificatesComponent,
    CertificatesDialogComponent,
    ConfigPageComponent,
    DeviceInfoPageComponent,
    DeviceManagementPageComponent,
    FileUploadDialogComponent,
    FtpComponent,
    FtpUserDialogComponent,
    HostPanelComponent,
    LdapComponent,
    LdapEditDialogComponent,
    LicensePageComponent,
    NetworkConfigurationComponent,
    NetworkConfigurationPageComponent,
    NetworkReconnectionComponent,
    RebootDialogComponent,
    RemoteAccessCardComponent,
    RemoteAccessComponent,
    RemoteAccessJoinDialogComponent,
    StatusComponent,
    StatusIndicatorComponent,
    UserDialogComponent,
    UsersPageComponent,
    CertificatesPageComponent,
    CertificatesCertstoreComponent,
    CertstoreDetailDialogComponent,
    ModemPanelComponent,
    ModemConfigPanelComponent,
    ModemConfigDialogComponent,
    IdentityPageComponent,
    InfoMemoryPanelComponent,
    TemplatePageComponent,
    TemplatePanelComponent,
    BackupRestorePageComponent,
    StorageListComponent,
    StorageComponent,
    EditStorageComponent,
    ActivationUrlComponent,
    WifiQualityComponent,
    KeyContainerComponent,

  ],
  providers: [
    AddOnsService,
    DeviceManagementService,
    FtpService,
    StatusService,
  ],
  entryComponents: [
    AddDialogComponent,
    CertificatesDialogComponent,
    CommonDialogComponent,
    ElementsDialogComponent,
    FileUploadDialogComponent,
    FtpUserDialogComponent,
    LdapEditDialogComponent,
    NetworkReconnectionComponent,
    RebootDialogComponent,
    RemoteAccessJoinDialogComponent,
    UserDialogComponent,
    CertstoreDetailDialogComponent,
    ModemConfigDialogComponent,
    EditStorageComponent,
  ],
})
export class SystemModule {
  constructor(private _addOnsService: AddOnsService) {
    this._addOnsService.getIstalledAddons().subscribe(dynamicItems => {
      dynamicItems.forEach(menuItem => SystemMenuItem.subItems.push(menuItem));
    });
  }
}
