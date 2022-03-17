import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { FtpService } from '@app/system/services';
import { dialogRefStub, authServiceStub, ftpServiceStub, routerServiceStub } from '@app/test';
import { DemoAuthService } from '@app/core/services';
import { LoaderService } from '@app/loop-loader';
import { FtpUserDialogComponent } from './ftp-user-dialog.component';

describe('FtpUserDialogComponent', () => {
  let component: FtpUserDialogComponent;
  let fixture: ComponentFixture<FtpUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpUserDialogComponent ],
      imports:
      [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatDialogModule
      ],
      providers: [
        LoaderService,
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: FtpService, useValue: ftpServiceStub },
        { provide: Router, useValue: routerServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtpUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
