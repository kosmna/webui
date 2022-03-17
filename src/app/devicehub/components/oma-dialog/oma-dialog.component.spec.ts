import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule,
  MatStepperModule,
} from '@angular/material';
import { dialogRefStub } from '@app/test';

import { OmaDialogComponent } from './oma-dialog.component';

describe('OmaDialogComponent', () => {
  let component: OmaDialogComponent;
  let fixture: ComponentFixture<OmaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatOptionModule,
        MatSelectModule,
        MatStepperModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [OmaDialogComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
