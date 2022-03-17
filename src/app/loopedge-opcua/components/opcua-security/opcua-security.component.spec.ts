import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcuaSecurityComponent } from './opcua-security.component';
import { SecurityModesComponent } from '@app/kosmyna-opcua/components/security-modes';
import { AuthenticationTypesComponent } from '@app/kosmyna-opcua/components/authentication-types';
import { SharedModule } from '@app/shared';
import { kosmynaOpcuaServiceStub, I18nTestProviders } from '@app/test';
import { UserManagementComponent } from '@app/kosmyna-opcua/components';
import {
  Favicons,
  FaviconService,
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
} from '@app/core';
import { OpcuaClientsComponent } from '../opcua-clients';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import * as fromOpc from '../../state/opc.reducer';

describe('OpcuaSecurityComponent', () => {
  let component: OpcuaSecurityComponent;
  let fixture: ComponentFixture<OpcuaSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('opc', fromOpc.reducer),
      ],
      declarations: [
        OpcuaSecurityComponent,
        SecurityModesComponent,
        AuthenticationTypesComponent,
        UserManagementComponent,
        OpcuaClientsComponent,
      ],
      providers: [
        I18nTestProviders,
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcuaSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
