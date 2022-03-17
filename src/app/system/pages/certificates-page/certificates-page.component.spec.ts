import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { DemoAuthService } from '@app/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from 'ngx-clipboard';

import {
  MatTabsModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatTooltipModule,
  MatMenuModule,
  MatListModule,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
} from '@angular/material';
import { IconDateCheckerComponent, CopyButtonComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services/device-management.service';
import { dmServiceStub, routerServiceStub, authServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { CertificatesPageComponent } from './certificates-page.component';
import { CertificatesCertstoreComponent, CertificatesComponent } from '@app/system/components';
import { IdentityPageComponent } from '../identity-page/identity-page.component';

describe('CertificatesPageComponent', () => {
  let component: CertificatesPageComponent;
  let fixture: ComponentFixture<CertificatesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
        MatTableModule,
        MatTooltipModule,
        MatMenuModule,
        CdkTableModule,
        MatListModule,
        MatDialogModule,
        FormsModule,
        MatInputModule,
        ClipboardModule,
        MatSnackBarModule
      ],
      declarations: [
        CertificatesPageComponent,
        CertificatesCertstoreComponent,
        CertificatesComponent,
        IconDateCheckerComponent,
        IdentityPageComponent,
        CopyButtonComponent,
       ],
       providers: [
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DemoAuthService, useValue: authServiceStub },
        NotificationsService,
        ...I18nTestProviders,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
