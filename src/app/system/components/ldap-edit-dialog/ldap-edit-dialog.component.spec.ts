import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatCheckboxModule,
  MatStepperModule,
} from '@angular/material';

import { dialogRefStub } from '@app/test';
import { LdapEditDialogComponent } from './ldap-edit-dialog.component';

describe('LdapEditDialogComponent', () => {
  let component: LdapEditDialogComponent;
  let fixture: ComponentFixture<LdapEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        ReactiveFormsModule,
        MatStepperModule,
      ],
      declarations: [ LdapEditDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LdapEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
