import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoOpcuaRoutingModule } from './kosmyna-opcua-routing.module';
import { OpcuaComponent, CertificateInfoComponent } from './components';
import { OpcuaTreeComponent } from './components/opcua-tree/opcua-tree.component';
import { SharedModule } from '@app/shared';
import { AddNodeComponent } from './components/add-node/add-node.component';
import { NodeDetailsComponent } from './components/node-details/node-details.component';
import { OpcuaSecurityComponent } from './components/opcua-security/opcua-security.component';
import {
  OpcuaService,
  ModifyGuard,
  cosmynaImportService,
} from '@app/kosmyna-opcua/services';
import { SecurityModesComponent } from './components/security-modes/security-modes.component';
import { AuthenticationTypesComponent } from './components/authentication-types/authentication-types.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddOpcuaUserComponent } from './components/add-opcua-user/add-opcua-user.component';
import { OpcuaClientsComponent } from './components/opcua-clients/opcua-clients.component';
import { OpcuaConnectionsComponent } from './components/opcua-connections/opcua-connections.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './state/opc.reducer';
import { OpcEffects } from './state/opc.effects';

@NgModule({
  imports: [
    CommonModule,
    DemoOpcuaRoutingModule,
    SharedModule,
    StoreModule.forFeature('opc', reducer),
    EffectsModule.forFeature([OpcEffects]),
  ],
  declarations: [
    OpcuaComponent,
    OpcuaTreeComponent,
    AddNodeComponent,
    NodeDetailsComponent,
    OpcuaSecurityComponent,
    SecurityModesComponent,
    AuthenticationTypesComponent,
    UserManagementComponent,
    AddOpcuaUserComponent,
    OpcuaClientsComponent,
    OpcuaConnectionsComponent,
    CertificateInfoComponent,
  ],
  entryComponents: [
    AddNodeComponent,
    AddOpcuaUserComponent,
    CertificateInfoComponent,
  ],
  providers: [OpcuaService, ModifyGuard, cosmynaImportService],
})
export class DemoOpcuaModule {}
