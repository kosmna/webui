import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatProgressBarModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatOptionModule,
  MatExpansionModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoAuthService } from '@app/core';
import {
  dmServiceStub,
  authServiceStub,
  routerServiceStub,
  dialogRefStub,
} from '@app/test';
import { DeviceManagementService } from '@app/system/services';
import { LoaderService } from '@app/loop-loader';
import { NotificationsService } from '@app/loop-notifications';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { HostPanelComponent } from './host-panel.component';
import { StoreModule } from '@ngrx/store';

describe('HostPanelComponent', () => {
  let component: HostPanelComponent;
  let fixture: ComponentFixture<HostPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatExpansionModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      declarations: [HostPanelComponent],
      providers: [
        LoaderService,
        NotificationsService,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
