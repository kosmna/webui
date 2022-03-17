import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatDialogModule, MatTableModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DeviceManagementService } from '@app/system/services';
import { routerServiceStub, dmServiceStub } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { Router } from '@angular/router';
import { DemoAuthService } from '@app/core';
import { authServiceStub } from '@app/test';
import { LoopFileInputComponent } from '@app/shared';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { BackupComponent } from './backup.component';
import { CdkTableModule } from '@angular/cdk/table';

describe('BackupComponent', () => {
  let component: BackupComponent;
  let fixture: ComponentFixture<BackupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatTableModule,
        CdkTableModule
      ],
      declarations: [
        BackupComponent,
        LoopFileInputComponent
      ],
      providers: [
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: Router, useValue: routerServiceStub },
        NotificationsService,
        ...I18nTestProviders,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
