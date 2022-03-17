import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTabsModule,
  MatCardModule,
  MatListModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BackupRestorePageComponent } from './backup-restore-page.component';
import { LoopFileInputComponent } from '@app/shared';
import { DeviceManagementService } from '@app/system/services';
import { dmServiceStub, authServiceStub, routerServiceStub, I18nTestProviders } from '@app/test';
import { Router } from '@angular/router';
import { DemoAuthService, UtilityService } from '@app/core';
import { LoaderService } from '@app/loop-loader';
import { NotificationsService } from '@app/loop-notifications';
import { TemplatePanelComponent, BackupComponent, TemplatePageComponent } from '@app/system/components';
import { CdkTableModule } from '@angular/cdk/table';

describe('BackupRestorePageComponent', () => {
  let component: BackupRestorePageComponent;
  let fixture: ComponentFixture<BackupRestorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        MatCardModule,
        MatDialogModule,
        FlexLayoutModule,
        MatListModule,
        MatCheckboxModule,
        MatIconModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        CdkTableModule,
      ],
      declarations: [
        TemplatePanelComponent,
        BackupRestorePageComponent,
        BackupComponent,
        TemplatePageComponent,
        LoopFileInputComponent,
      ],
      providers: [
        NotificationsService,
        UtilityService,
        LoaderService,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: Router, useValue: routerServiceStub },
        { provide: DemoAuthService, useValue: authServiceStub },
        I18nTestProviders,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupRestorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
