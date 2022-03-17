import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatListModule,
  MatIconModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatSnackBarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { Router } from '@angular/router';

import { CopyButtonComponent } from '@app/shared';
import { routerServiceStub, dialogRefStub, RegisterResponse } from '@app/test';
import { NotificationsService } from '@app/loop-notifications';
import { RegistersWriteDialogComponent } from './registers-write-dialog.component';

describe('RegistersWriteDialogComponent', () => {
  let component: RegistersWriteDialogComponent;
  let fixture: ComponentFixture<RegistersWriteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatListModule,
        ClipboardModule,
        MatIconModule,
        MatSnackBarModule
      ],
      declarations: [ RegistersWriteDialogComponent, CopyButtonComponent ],
      providers: [
        NotificationsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {register: RegisterResponse} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersWriteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
