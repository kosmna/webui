import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcuaConnectionsComponent } from './opcua-connections.component';
import { SharedModule } from '@app/shared';
import { OpcuaClientsComponent } from '../opcua-clients';
import { OpcuaService } from '@app/kosmyna-opcua/services';
import { kosmynaOpcuaServiceStub } from '@app/test';
import {
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
  Favicons,
  FaviconService,
  UtilityService,
} from '@app/core';
import { StoreModule } from '@ngrx/store';
import * as fromOpc from '../../state/opc.reducer';

describe('OpcuaConnectionsComponent', () => {
  let component: OpcuaConnectionsComponent;
  let fixture: ComponentFixture<OpcuaConnectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpcuaConnectionsComponent, OpcuaClientsComponent],
      imports: [
        SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('opc', fromOpc.reducer),
      ],
      providers: [
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcuaConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
