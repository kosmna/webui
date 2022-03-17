import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatDialogRef,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { PasswordIndicatorComponent } from '@app/shared';
import { DemoAuthService } from '@app/core/services';
import { dialogRefStub, authServiceStub } from '@app/test';
import { UserDialogComponent } from '.';

describe('UserDialogComponent', () => {
  let component: UserDialogComponent;
  let fixture: ComponentFixture<UserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        UserDialogComponent,
        PasswordIndicatorComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
        { provide: DemoAuthService, useValue: authServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
