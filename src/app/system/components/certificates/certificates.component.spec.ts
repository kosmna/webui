import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatDialog,
  MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
  MatExpansionModule,
  MatListModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { PlatformModule } from '@angular/cdk/platform';
import { OverlayModule } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NotificationsService } from '@app/loop-notifications/services';
import { LoopFileInputComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService } from '@app/core';
import { dmServiceStub, routerServiceStub, authServiceStub } from '@app/test';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { CertificatesComponent } from './certificates.component';
describe('CertificatesComponent', () => {
  let component: CertificatesComponent;
  let fixture: ComponentFixture<CertificatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        ReactiveFormsModule,
        MatExpansionModule,
        ScrollDispatchModule,
        PlatformModule,
        OverlayModule,
        MatListModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [
        CertificatesComponent,
        LoopFileInputComponent,
      ],
      providers:  [
        MAT_DIALOG_SCROLL_STRATEGY_PROVIDER,
        NotificationsService,
        MatDialog,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
