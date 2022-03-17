import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule
} from '@angular/material';
import { dialogRefStub } from '@app/test';

import { SensonodeConfirmationDialogComponent } from '../sensonode-confirmation-dialog/sensonode-confirmation-dialog.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CopyButtonComponent } from '@app/shared';

describe('SensonodeConfirmationDialogComponent', () => {
  let component: SensonodeConfirmationDialogComponent;
  let fixture: ComponentFixture<SensonodeConfirmationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule,
        ClipboardModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      declarations: [
        SensonodeConfirmationDialogComponent,
        CopyButtonComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensonodeConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
