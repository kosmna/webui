import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { UiThemingModule } from '@app/ui-theming';
import { cosmynaRoutingModule } from '@app/cosmyna/cosmyna-routing.module';
import {
  cosmynaService,
  DevicesStoreService,
  RegistersStoreService,
  NetworkDiscoveryService,
  cosmynaDynamicInputsService,
} from '@app/cosmyna/services';
import { cosmynaAddDeviceDialogComponent } from '@app/cosmyna/components/cosmyna-add-device-dialog';
import { RegistersComponent } from '@app/cosmyna/components/registers';
import { DevicesComponent } from '@app/cosmyna/components/devices';
import { RegistersAddRegisterDialogComponent } from '@app/cosmyna/components/registers-add-register-dialog';
import { OmaComponent } from '@app/cosmyna/components/oma';
import { RegisterValueComponent } from '@app/cosmyna/components/register-value';
import { OmaDialogComponent } from '@app/cosmyna/components/oma-dialog';
import { UploadComponent } from '@app/cosmyna/components/upload/upload.component';
import { DeviceCardComponent } from '@app/cosmyna/components/device-card/device-card.component';
import { RegistersWriteDialogComponent } from '@app/cosmyna/components/registers-write-dialog/registers-write-dialog.component';
import { TagPageComponent } from '@app/cosmyna/pages/tag-page/tag-page.component';
import { DevicePageComponent } from '@app/cosmyna/pages/device-page/device-page.component';
import { DatePipe } from '@angular/common';
import { DeviceIdToNamePipe } from './pipes/device-id-to-name.pipe';
import { DiscoverNetworkTableComponent } from './components/discover-network-table/discover-network-table.component';
import { RegisterStatusComponent } from './register-status/register-status.component';
import {
  BrowseTagDialogComponent,
  DiscoverNetworkComponent,
} from './components';
import { DiscoverPageComponent } from './pages';

@NgModule({
  imports: [cosmynaRoutingModule, SharedModule, UiThemingModule],
  declarations: [
    DeviceCardComponent,
    cosmynaAddDeviceDialogComponent,
    DevicePageComponent,
    DevicesComponent,
    DiscoverNetworkComponent,
    DiscoverPageComponent,
    OmaComponent,
    OmaDialogComponent,
    RegistersAddRegisterDialogComponent,
    RegistersComponent,
    RegistersWriteDialogComponent,
    RegisterValueComponent,
    TagPageComponent,
    UploadComponent,
    BrowseTagDialogComponent,
    DeviceIdToNamePipe,
    DiscoverNetworkTableComponent,
    RegisterStatusComponent,
    BrowseTagDialogComponent,
  ],
  providers: [
    DatePipe,
    cosmynaService,
    DevicesStoreService,
    NetworkDiscoveryService,
    RegistersStoreService,
    cosmynaDynamicInputsService,
  ],
  entryComponents: [
    cosmynaAddDeviceDialogComponent,
    OmaDialogComponent,
    RegistersAddRegisterDialogComponent,
    RegistersWriteDialogComponent,
    RegisterValueComponent,
    UploadComponent,
    BrowseTagDialogComponent,
  ],
})
export class cosmynaModule {}
