import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatInputModule,
  MatOptionModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatSelectModule,
  MatListModule,
  MatProgressBarModule,
  MatIconModule,
  MatExpansionModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatTableModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';

import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub, authServiceStub, dialogRefStub } from '@app/test';
import { DemoAuthService, UtilityService } from '@app/core';
import { LoaderService } from '@app/loop-loader';
import { routerServiceStub } from '@app/test';
import { Router } from '@angular/router';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { NetworkConfigurationPageComponent } from './network-configuration-page.component';
import {
  NetworkConfigurationComponent,
  HostPanelComponent,
  ModemConfigPanelComponent,
} from '@app/system/components';
import { StoreModule } from '@ngrx/store';

describe('NetworkConfigurationPageComponent', () => {
  let component: NetworkConfigurationPageComponent;
  let fixture: ComponentFixture<NetworkConfigurationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatOptionModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatCheckboxModule,
        MatListModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatIconModule,
        MatExpansionModule,
        MatTableModule,
        CdkTableModule,
        StoreModule.forRoot({}),
      ],
      declarations: [
        NetworkConfigurationPageComponent,
        NetworkConfigurationComponent,
        HostPanelComponent,
        ModemConfigPanelComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        NotificationsService,
        LoaderService,
        UtilityService,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        MatDialog,
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkConfigurationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
