import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcuaComponent } from './opcua.component';
import { SharedModule } from '@app/shared';
import { OpcuaTreeComponent } from '@app/kosmyna-opcua/components/opcua-tree';
import { NodeDetailsComponent } from '@app/kosmyna-opcua/components/node-details';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { cosmynaServiceStub, I18nTestProviders } from '@app/test';
import {
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
  Favicons,
  FaviconService,
} from '@app/core';
import { StoreModule } from '@ngrx/store';
import * as fromOpc from '../../state/opc.reducer';
import { cosmynaImportService } from '@app/kosmyna-opcua/services';

describe('OpcuaComponent', () => {
  let component: OpcuaComponent;
  let fixture: ComponentFixture<OpcuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('opc', fromOpc.reducer),
      ],
      declarations: [OpcuaComponent, OpcuaTreeComponent, NodeDetailsComponent],
      providers: [
        I18nTestProviders,
        { provide: cosmynaImportService, useValue: cosmynaServiceStub },
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcuaComponent);
    component = fixture.componentInstance;
    component.selectedNode = { name: 'name', data: { data: {} } } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
