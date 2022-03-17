import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

import { dialogRefStub, authServiceStub, dmServiceStub } from '@app/test';
import { DeviceManagementService } from '@app/system/services';
import { DemoAuthService, LocaleService } from '@app/core';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { FileUploadDialogComponent } from './file-upload-dialog.component';

describe('FileUploadDialogComponent', () => {
  let component: FileUploadDialogComponent;
  let fixture: ComponentFixture<FileUploadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule,
        MatDialogModule

      ],
      declarations: [ FileUploadDialogComponent ],
      providers: [
        LocaleService,
        { provide: DeviceManagementService, useValue: dmServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { file: {} } },
        { provide: DemoAuthService, useValue: authServiceStub },
        ...I18nTestProviders,

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when dialog opens it should show a warning message', () => {
    expect(component.title).toBe('Warning');
  });

});
