import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectorsComponent } from './connectors.component';
import {
  routerServiceStub,
  I18nTestProviders,
  authServiceStub,
} from '@app/test';
import { SharedModule } from '@app/shared';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConnectorComponent } from '@app/kosmyna-cc/components/connector';
import { Router } from '@angular/router';
import { DemoAuthService } from '@app/core';
import { StoreModule } from '@ngrx/store';
import * as fromIntegration from '../../state/integration.reducer';

describe('ConnectorsComponent', () => {
  let component: ConnectorsComponent;
  let fixture: ComponentFixture<ConnectorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('integration', fromIntegration.reducer),
      ],
      declarations: [ConnectorsComponent, ConnectorComponent],
      providers: [
        { provide: Router, useValue: routerServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
