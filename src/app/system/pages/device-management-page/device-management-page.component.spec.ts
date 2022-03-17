import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDialogModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ObservableMedia } from '@angular/flex-layout';

import { LoopFileInputComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService, UtilityService } from '@app/core';
import { dmServiceStub, authServiceStub, routerServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { LoaderService } from '@app/loop-loader/services';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { DeviceManagementPageComponent } from './device-management-page.component';
import { ActivationUrlComponent } from '@app/system/components';

describe('DeviceManagementPageComponent', () => {
  let component: DeviceManagementPageComponent;
  let fixture: ComponentFixture<DeviceManagementPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatInputModule,
        MatCardModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        CdkTableModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatIconModule,
        MatListModule
      ],
      declarations: [
        DeviceManagementPageComponent,
        LoopFileInputComponent,
        ActivationUrlComponent,
      ],
      providers: [
        LoaderService,
        ObservableMedia,
        UtilityService,
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
